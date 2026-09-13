import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataStoreService } from '../data/data-store.service.js';

@Injectable()
export class OrdersService {
  constructor(private readonly store: DataStoreService) {}

  checkout(userId: string) {
    const cart = this.store.getOrCreateCart(userId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Your cart is empty');
    }

    const items = cart.items.map((item) => {
      const product = this.store.products.find((p) => p.id === item.productId);
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }
      return { item, product };
    });

    for (const { item, product } of items) {
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Not enough stock for ${product.name}`);
      }
    }

    const totalPrice = items.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);

    const order = {
      id: this.store.createId(),
      userId,
      status: 'PENDING' as const,
      totalPrice,
      createdAt: new Date(),
      items: items.map(({ item, product }) => ({
        id: this.store.createId(),
        orderId: '',
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      })),
    };
    order.items.forEach((orderItem) => (orderItem.orderId = order.id));
    this.store.orders.push(order);

    for (const { item, product } of items) {
      product.stock -= item.quantity;
    }
    cart.items.length = 0;

    return this.store.hydrateOrder(order);
  }

  findAllForUser(userId: string) {
    return this.store.orders
      .filter((order) => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((order) => this.store.hydrateOrder(order));
  }

  findOneForUser(userId: string, orderId: string) {
    const order = this.store.orders.find((o) => o.id === orderId && o.userId === userId);
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }
    return this.store.hydrateOrder(order);
  }
}

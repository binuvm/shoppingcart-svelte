import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataStoreService } from '../data/data-store.service.js';
import type { AddCartItemDto } from './dto/add-cart-item.dto.js';
import type { UpdateCartItemDto } from './dto/update-cart-item.dto.js';

@Injectable()
export class CartService {
  constructor(private readonly store: DataStoreService) {}

  getCart(userId: string) {
    const cart = this.store.getOrCreateCart(userId);
    return this.store.hydrateCart(cart);
  }

  addItem(userId: string, dto: AddCartItemDto) {
    const cart = this.store.getOrCreateCart(userId);

    const product = this.store.products.find((p) => p.id === dto.productId);
    if (!product) {
      throw new NotFoundException(`Product ${dto.productId} not found`);
    }
    if (product.stock < dto.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    const existing = cart.items.find((item) => item.productId === dto.productId);
    if (existing) {
      existing.quantity += dto.quantity;
    } else {
      cart.items.push({
        id: this.store.createId(),
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      });
    }

    return this.store.hydrateCart(cart);
  }

  updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cart = this.store.getOrCreateCart(userId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    item.quantity = dto.quantity;
    return this.store.hydrateCart(cart);
  }

  removeItem(userId: string, itemId: string) {
    const cart = this.store.getOrCreateCart(userId);
    const index = cart.items.findIndex((i) => i.id === itemId);
    if (index === -1) {
      throw new NotFoundException('Cart item not found');
    }

    cart.items.splice(index, 1);
    return this.store.hydrateCart(cart);
  }

  clearCart(userId: string) {
    const cart = this.store.getOrCreateCart(userId);
    cart.items.length = 0;
    return this.store.hydrateCart(cart);
  }
}

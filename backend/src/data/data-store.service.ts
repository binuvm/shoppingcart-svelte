import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import type { Cart, CartItem, Category, Order, OrderItem, Product, User } from './entities.js';

// Temporary in-memory data store. Swap for Prisma/PlanetScale once the DB is wired up.
@Injectable()
export class DataStoreService {
  readonly categories: Category[] = [];
  readonly products: Product[] = [];
  readonly users: User[] = [];
  readonly carts: Cart[] = [];
  readonly orders: Order[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    const flours: Category = { id: randomUUID(), name: 'Atta & Flours', slug: 'flours' };
    const riceGrains: Category = { id: randomUUID(), name: 'Rice & Grains', slug: 'rice-grains' };
    const dalsPulses: Category = { id: randomUUID(), name: 'Dals & Pulses', slug: 'dals-pulses' };
    const spicesMasalas: Category = { id: randomUUID(), name: 'Spices & Masalas', slug: 'spices-masalas' };
    const dairyGhee: Category = { id: randomUUID(), name: 'Dairy & Ghee', slug: 'dairy-ghee' };
    const snacksNamkeen: Category = { id: randomUUID(), name: 'Snacks & Namkeen', slug: 'snacks-namkeen' };

    this.categories.push(flours, riceGrains, dalsPulses, spicesMasalas, dairyGhee, snacksNamkeen);

    this.products.push(
      // --- Atta & Flours ---
      {
        id: randomUUID(),
        name: 'Aashirvaad Superior MP Sharbati Atta (10kg)',
        slug: 'aashirvaad-sharbati-atta-10kg',
        description: '100% pure whole wheat stone-ground chakki fresh flour with natural dietary fiber.',
        price: 18.99,
        imageUrl: null,
        stock: 120,
        categoryId: flours.id,
      },
      {
        id: randomUUID(),
        name: 'Pillsbury Chakki Fresh Atta (5kg)',
        slug: 'pillsbury-chakki-atta-5kg',
        description: 'Traditional chakki milled wheat flour for soft, fluffy rotis.',
        price: 9.99,
        imageUrl: null,
        stock: 85,
        categoryId: flours.id,
      },
      {
        id: randomUUID(),
        name: 'Tata Sampann Fine Besan / Gram Flour (1kg)',
        slug: 'tata-sampann-besan-1kg',
        description: '100% unpolished Chana Dal besan, rich in natural protein for pakoras and sweets.',
        price: 3.49,
        imageUrl: null,
        stock: 90,
        categoryId: flours.id,
      },
      {
        id: randomUUID(),
        name: 'Sujata Gold Sharbati Whole Wheat Atta (10kg)',
        slug: 'sujata-gold-atta-10kg',
        description: 'Premium MP Sharbati golden grains ensuring extra soft rotis.',
        price: 19.5,
        imageUrl: null,
        stock: 45,
        categoryId: flours.id,
      },

      // --- Rice & Grains ---
      {
        id: randomUUID(),
        name: 'India Gate Basmati Rice Classic (5kg)',
        slug: 'india-gate-basmati-classic-5kg',
        description: 'Aged extra long slender grain aromatic basmati rice for royal biryanis and pulao.',
        price: 16.99,
        imageUrl: null,
        stock: 75,
        categoryId: riceGrains.id,
      },
      {
        id: randomUUID(),
        name: 'Daawat Rozana Gold Basmati Rice (5kg)',
        slug: 'daawat-rozana-gold-5kg',
        description: 'Premium daily cooking long grain fragrant Basmati rice.',
        price: 12.99,
        imageUrl: null,
        stock: 110,
        categoryId: riceGrains.id,
      },
      {
        id: randomUUID(),
        name: 'Fortune Sona Masoori Raw Rice (5kg)',
        slug: 'fortune-sona-masoori-5kg',
        description: 'Lightweight, low starch South Indian aromatic staple rice.',
        price: 11.49,
        imageUrl: null,
        stock: 60,
        categoryId: riceGrains.id,
      },

      // --- Dals & Pulses ---
      {
        id: randomUUID(),
        name: 'Tata Sampann Unpolished Toor / Arhar Dal (2kg)',
        slug: 'tata-sampann-toor-dal-2kg',
        description: 'Rich in dietary fiber and protein, naturally sun-dried without artificial polish.',
        price: 7.99,
        imageUrl: null,
        stock: 140,
        categoryId: dalsPulses.id,
      },
      {
        id: randomUUID(),
        name: 'Tata Sampann Unpolished Moong Dal Split (1kg)',
        slug: 'tata-sampann-moong-dal-1kg',
        description: 'Nutritious yellow split moong dal, easy to digest for khichdi and soups.',
        price: 3.99,
        imageUrl: null,
        stock: 95,
        categoryId: dalsPulses.id,
      },
      {
        id: randomUUID(),
        name: 'Organic Chana Dal / Split Bengal Gram (1kg)',
        slug: 'organic-chana-dal-1kg',
        description: 'Certified organic unpolished yellow split chickpeas with rich aroma.',
        price: 3.79,
        imageUrl: null,
        stock: 80,
        categoryId: dalsPulses.id,
      },
      {
        id: randomUUID(),
        name: 'Tata Sampann Whole Urad Dal / Black Matpe (1kg)',
        slug: 'tata-sampann-urad-dal-1kg',
        description: 'Premium unpolished black gram, essential for Dal Makhani and South Indian batters.',
        price: 4.25,
        imageUrl: null,
        stock: 65,
        categoryId: dalsPulses.id,
      },
      {
        id: randomUUID(),
        name: 'Premium Kabuli Chana / Chickpeas Large (1kg)',
        slug: 'kabuli-chana-1kg',
        description: 'Extra large count chickpeas ideal for Punjabi Chole and Mediterranean dips.',
        price: 3.99,
        imageUrl: null,
        stock: 100,
        categoryId: dalsPulses.id,
      },

      // --- Spices & Masalas ---
      {
        id: randomUUID(),
        name: 'MDH Garam Masala (100g)',
        slug: 'mdh-garam-masala-100g',
        description: 'Authentic blend of cardamom, cinnamon, cloves, and mace for rich aromatic curries.',
        price: 2.79,
        imageUrl: null,
        stock: 150,
        categoryId: spicesMasalas.id,
      },
      {
        id: randomUUID(),
        name: 'Everest Kashmiri Lal Mirch Powder (100g)',
        slug: 'everest-kashmiri-mirch-100g',
        description: 'Mild heat with brilliant natural red color for tandoori and rich curry gravies.',
        price: 2.49,
        imageUrl: null,
        stock: 130,
        categoryId: spicesMasalas.id,
      },
      {
        id: randomUUID(),
        name: 'Tata Sampann Turmeric / Haldi Powder (200g)',
        slug: 'tata-sampann-turmeric-200g',
        description: 'Minimum 3% natural curcumin content with therapeutic benefits and rich golden color.',
        price: 2.19,
        imageUrl: null,
        stock: 160,
        categoryId: spicesMasalas.id,
      },
      {
        id: randomUUID(),
        name: 'MDH Chunky Chat Masala (100g)',
        slug: 'mdh-chunky-chat-masala-100g',
        description: 'Tangy and zesty spice blend for salads, fruit platters, papdis, and street snacks.',
        price: 2.29,
        imageUrl: null,
        stock: 90,
        categoryId: spicesMasalas.id,
      },
      {
        id: randomUUID(),
        name: 'Catch Whole Cumin Seeds / Jeera (200g)',
        slug: 'catch-jeera-seeds-200g',
        description: 'Sun-dried aromatic whole cumin seeds for authentic tadka tempering.',
        price: 3.49,
        imageUrl: null,
        stock: 85,
        categoryId: spicesMasalas.id,
      },

      // --- Dairy & Ghee ---
      {
        id: randomUUID(),
        name: 'Amul Pure Ghee Tin (1L)',
        slug: 'amul-pure-ghee-1l',
        description: 'Classic aromatic golden clarified butter made from fresh milk cream.',
        price: 15.99,
        imageUrl: null,
        stock: 70,
        categoryId: dairyGhee.id,
      },
      {
        id: randomUUID(),
        name: 'Amul Fresh Malai Paneer Block (200g)',
        slug: 'amul-malai-paneer-200g',
        description: 'Soft and rich cottage cheese block, essential for Shahi Paneer and Tikka.',
        price: 3.49,
        imageUrl: null,
        stock: 40,
        categoryId: dairyGhee.id,
      },
      {
        id: randomUUID(),
        name: 'Patanjali Cow Ghee Jar (1L)',
        slug: 'patanjali-cow-ghee-1l',
        description: '100% pure Ayurvedic cow milk ghee with distinct granular texture and aroma.',
        price: 16.49,
        imageUrl: null,
        stock: 55,
        categoryId: dairyGhee.id,
      },

      // --- Snacks & Namkeen ---
      {
        id: randomUUID(),
        name: 'Haldirams Nagpur Aloo Bhujia (400g)',
        slug: 'haldirams-aloo-bhujia-400g',
        description: 'Crispy spicy potato and gram flour sev flavored with mint and Indian spices.',
        price: 3.99,
        imageUrl: null,
        stock: 120,
        categoryId: snacksNamkeen.id,
      },
      {
        id: randomUUID(),
        name: 'Haldirams All in One Mixture (400g)',
        slug: 'haldirams-all-in-one-400g',
        description: 'Signature savory blend of nuts, cornflakes, sev, and roasted pulses.',
        price: 4.19,
        imageUrl: null,
        stock: 90,
        categoryId: snacksNamkeen.id,
      },
      {
        id: randomUUID(),
        name: 'Parle-G Original Glucose Biscuits (800g Family Pack)',
        slug: 'parle-g-family-pack-800g',
        description: 'India’s favorite tea-time crunchy glucose biscuit.',
        price: 3.29,
        imageUrl: null,
        stock: 150,
        categoryId: snacksNamkeen.id,
      },
    );

    const demoUser: User = {
      id: randomUUID(),
      email: 'demo@example.com',
      name: 'Demo User',
      passwordHash: bcrypt.hashSync('Password123!', 10),
      role: 'CUSTOMER',
      createdAt: new Date(),
    };
    this.users.push(demoUser);
    this.carts.push({ id: randomUUID(), userId: demoUser.id, items: [] });
  }

  createId() {
    return randomUUID();
  }

  getOrCreateCart(userId: string): Cart {
    let cart = this.carts.find((c) => c.userId === userId);
    if (!cart) {
      cart = { id: randomUUID(), userId, items: [] };
      this.carts.push(cart);
    }
    return cart;
  }

  hydrateCart(cart: Cart) {
    return {
      id: cart.id,
      userId: cart.userId,
      items: cart.items.map((item) => this.hydrateCartItem(item)),
    };
  }

  hydrateCartItem(item: CartItem) {
    const product = this.products.find((p) => p.id === item.productId);
    return { ...item, product };
  }

  hydrateOrder(order: Order) {
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: this.products.find((p) => p.id === item.productId),
      })),
    };
  }

  hydrateProduct(product: Product) {
    return { ...product, category: this.categories.find((c) => c.id === product.categoryId) };
  }
}

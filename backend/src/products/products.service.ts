import { Injectable, NotFoundException } from '@nestjs/common';
import { DataStoreService } from '../data/data-store.service.js';
import type { QueryProductsDto } from './dto/query-products.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly store: DataStoreService) {}

  findAll(query: QueryProductsDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const search = query.search?.toLowerCase();

    const filtered = this.store.products.filter((product) => {
      if (query.categoryId && product.categoryId !== query.categoryId) return false;
      if (search && !product.name.toLowerCase().includes(search)) return false;
      return true;
    });

    const total = filtered.length;
    const items = filtered
      .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
      .map((product) => this.store.hydrateProduct(product));

    return { items, total, page, pageSize };
  }

  findOne(id: string) {
    const product = this.store.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return this.store.hydrateProduct(product);
  }
}

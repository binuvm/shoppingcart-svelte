import { Injectable, NotFoundException } from '@nestjs/common';
import { DataStoreService } from '../data/data-store.service.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly store: DataStoreService) {}

  findAll() {
    return [...this.store.categories].sort((a, b) => a.name.localeCompare(b.name));
  }

  findOne(id: string) {
    const category = this.store.categories.find((c) => c.id === id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }
}

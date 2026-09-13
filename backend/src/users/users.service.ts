import { Injectable, NotFoundException } from '@nestjs/common';
import { DataStoreService } from '../data/data-store.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly store: DataStoreService) {}

  findById(id: string) {
    const user = this.store.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return safeUser;
  }
}

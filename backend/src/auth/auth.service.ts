import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { DataStoreService } from '../data/data-store.service.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly store: DataStoreService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = this.store.users.find((u) => u.email === dto.email);
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = {
      id: this.store.createId(),
      email: dto.email,
      name: dto.name,
      passwordHash,
      role: 'CUSTOMER' as const,
      createdAt: new Date(),
    };
    this.store.users.push(user);
    this.store.getOrCreateCart(user.id);

    return this.buildAuthResponse(user.id, user.email, user.role, user.name);
  }

  async login(dto: LoginDto) {
    const user = this.store.users.find((u) => u.email === dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user.id, user.email, user.role, user.name);
  }

  private buildAuthResponse(sub: string, email: string, role: string, name: string) {
    const accessToken = this.jwt.sign({ sub, email, role });
    return {
      accessToken,
      user: { id: sub, email, name, role },
    };
  }
}

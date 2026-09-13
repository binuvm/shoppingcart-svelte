import { Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { DataStoreService } from '../data/data-store.service.js';

/**
 * JWT Authentication Guard (Temporarily bypassed for development/testing).
 * Automatically injects the default demo user context to all requests.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly store: DataStoreService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const demoUser = this.store.users[0];
    request.user = {
      userId: demoUser ? demoUser.id : 'demo-user-id',
      email: demoUser ? demoUser.email : 'demo@example.com',
      role: demoUser ? demoUser.role : 'CUSTOMER',
    };
    return true;
  }
}

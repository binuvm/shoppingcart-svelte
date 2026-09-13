import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export interface CurrentUserPayload {
  userId: string;
  email: string;
  role: string;
}

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
  const request = ctx.switchToHttp().getRequest();
  return request.user ?? {
    userId: 'demo-user-id',
    email: 'demo@example.com',
    role: 'CUSTOMER',
  };
});

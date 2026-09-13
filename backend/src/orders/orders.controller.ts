import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser, type CurrentUserPayload } from '../auth/current-user.decorator.js';
import { OrdersService } from './orders.service.js';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @HttpCode(HttpStatus.CREATED)
  checkout(@CurrentUser() user: CurrentUserPayload) {
    return this.ordersService.checkout(user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUserPayload) {
    return this.ordersService.findAllForUser(user.userId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.ordersService.findOneForUser(user.userId, id);
  }
}

import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { Payload } from '../commons/decorators/payload.decrators';

@Controller('favorites')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() modelId: string, @Payload('sub') sub: string) {
    return this.favoritesService.create(modelId, sub);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.favoritesService.findAll(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Payload('sub') sub: string) {
    return this.favoritesService.remove(id, sub);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private  favoritesService: FavoritesService) {}

  @Post()
  async create(@Req() req: Request) {
    try {
      let result = await this.favoritesService.create(req.body);
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }


  @Get()
  async findAll(@Req() req: Request) {
    try {
      let result = await this.favoritesService.findAll();;
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }

  @Get('establishment/:id')
  async findestablishmentFavorites(@Param('id') id: string,@Req() req: Request) {
    try {
      let result = await this.favoritesService.findSelectedFavorites(id,'establishmentId');
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }

  @Get('user/:id')
  async findUserFavorites(@Param('id') id: string,@Req() req: Request) {
    try {
      let result = await this.favoritesService.findSelectedFavorites(id,'userId');
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.favoritesService.remove(id);
  }
}

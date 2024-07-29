import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorites } from './entities/Favorites.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class FavoritesService {
  constructor( @InjectModel(Favorites.name) private favoritesModel: Model<Favorites>){}

  create(createEstablishmentDto: CreateFavoriteDto) {
    const newFavorite = new this.favoritesModel({...createEstablishmentDto,createdAt:Date.now()});
    return newFavorite.save();
  }

  findSelectedFavorites(Id: string, type: string) {
    return this.favoritesModel.find({ [type]: Id });
  }

  findAll() {
    return this.favoritesModel.find();
  }

  remove(id: number) {
    return this.favoritesModel.findByIdAndDelete(id);
  }
}

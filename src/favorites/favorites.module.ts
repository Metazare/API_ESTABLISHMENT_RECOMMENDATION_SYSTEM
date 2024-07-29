import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorites, FavoritesSchema } from './entities/Favorites.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{ 
      name: Favorites.name, schema: FavoritesSchema 
    }]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

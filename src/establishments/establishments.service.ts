import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Establishments } from './entities/Establishments.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';

@UseGuards(JwtAuthGuard)
@Injectable()
export class EstablishmentsService {
  constructor( @InjectModel(Establishments.name) private establishmentsModel: Model<Establishments>){}
  create(createEstablishmentDto: CreateEstablishmentDto) {
    const newEstablishment = new this.establishmentsModel({...createEstablishmentDto,createdAt:Date.now()});
    return newEstablishment.save();
  }

  findAll() {
    return this.establishmentsModel.find();
  }

  findOne(id: number) {
    return this.establishmentsModel.findById(id);
  }

  async recommendation(types: string[]) {
    return this.establishmentsModel.find({type:{$in:types}}).sort({views: -1});
  }

  async addView(id: string) {  
    const updatedEstablishment = await this.establishmentsModel.findByIdAndUpdate(String(id), {$inc: {views: 1}}, {new: true});
    return {views:updatedEstablishment.views};
  }

  update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentsModel.findByIdAndUpdate(id,updateEstablishmentDto,{new:true});
  }

  remove(id: number) {
    return this.establishmentsModel.findByIdAndDelete(id);
  }
}

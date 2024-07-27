import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Establishments } from './entities/Establishments.schema';

@Injectable()
export class EstablishmentsService {
  constructor( @InjectModel(Establishments.name) private establishmentsModel: Model<Establishments>){}
  create(createEstablishmentDto: CreateEstablishmentDto) {
    const newProduct = new this.establishmentsModel({...createEstablishmentDto,createdAt:Date.now()});
    return newProduct.save();
  }

  findAll() {
    return this.establishmentsModel.find();;
  }

  findOne(id: number) {
    return this.establishmentsModel.findById(id);
  }

  update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentsModel.findByIdAndUpdate(id,updateEstablishmentDto,{new:true});
  }

  remove(id: number) {
    return this.establishmentsModel.findByIdAndDelete(id);
  }
}

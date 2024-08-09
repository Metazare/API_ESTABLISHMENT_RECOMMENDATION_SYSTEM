import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Establishments } from './entities/Establishments.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';
import { max } from 'class-validator';

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

  async recommendation(
    types: string[],
    barangay: string[],
    search: string,
    currentPage: number
  ) {
    const limit = 10;
    const skip = (currentPage - 1) * limit;
  
    // Building the query
    let query: any = {};
    
    if (types.length > 0 && types !== undefined) {
      query = {
        ...query,
        type: { $in: types.map(type => type.toLowerCase()) },
      };
    }


    if (Array.isArray(barangay) && barangay.length > 0 && barangay !== undefined) {
      query = {
        ...query,
        barangay: { $in: barangay.map(barangay => barangay.toLowerCase()) },
      };
    }

    if(search !== "" && search !== null && search !== undefined ){
      query={
        ...query,
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      }
    }
    try {
      const [establishments, total] = await Promise.all([
        this.establishmentsModel.find(query).sort({views: -1}).limit(limit).skip(skip).exec(),
        this.establishmentsModel.countDocuments(query),
      ]);
  
      const totalPages = Math.ceil(total / limit);
  
      return {
        data: establishments,
        total,
        totalPages,
        currentPage,
      };
    } catch (error) {
      throw new Error(`Failed to fetch recommendations: ${error.message}`);
    }
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

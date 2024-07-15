import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor( @InjectModel(User.name) private userModel: Model<User>){}
  
  create(createUserDto: CreateUserDto) {
    const password =  hashPassword(createUserDto.password);
    const newUser = new this.userModel({...createUserDto,createdAt:Date.now(),password:password});
    return newUser.save();
  }
  findAll() {
    const users = this.userModel.find({}, { password: 0 });
    return users;
  }
  findOne(payload: string,type:string) {
    switch(type){
      case "email": // find user by email
        return this.userModel.findOne({email:payload});
      case "username":  // find user by username
        return this.userModel.findOne({username:payload});
      default: // find user by id
        return this.userModel.findById(payload);
    }
  }
  
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}

import { Controller, Get, Post,Req, Body,Put, Patch, Param, Delete, NotFoundException, ParseIntPipe ,ValidationPipe, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const  response = await this.usersService.findOne(id,"id")
      return {
        _id:response._id,
        email:response.email,
        name:response.name,
        createdAt:response.createdAt,
        role:response.role,
        image:response.image,
        preferences:response.preferences
      };
    }catch(e){
      throw new NotFoundException();
    }
  }

  @Patch("preferences/:id")
  @UseGuards(JwtAuthGuard)
  updatePreferences(@Param('id') id: string, @Body() value: string[]) {
    return this.usersService.updatePreferences(id, value);
  }
}

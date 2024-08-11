import { Controller, Get, Post, Body,Put, Patch, Param, Delete, NotFoundException, ParseIntPipe ,ValidationPipe, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Post()
  // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

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

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id,updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string,) {
  //   return this.usersService.remove(id);
  // }
}

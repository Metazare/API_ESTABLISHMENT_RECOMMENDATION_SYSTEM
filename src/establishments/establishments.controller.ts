import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';
import { Request } from 'express';

@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request) {
    try {
      let result = await this.establishmentsService.create(req.body);
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.establishmentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentsService.update(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.establishmentsService.remove(+id);
  }
}

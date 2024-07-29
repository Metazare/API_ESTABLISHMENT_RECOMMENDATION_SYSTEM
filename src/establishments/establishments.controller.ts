import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/Jwt.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
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

  @Get("addView/:id")
  async addView(@Req() req: Request, @Param('id') id: string) {
    try {
      let result = await this.establishmentsService.addView(id);
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
      let result = await this.establishmentsService.findAll();
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }

  @Get('recommendation')
  async recommendation(@Req() req: Request) {
    try {
      let result = await this.establishmentsService.recommendation(["restaurant"]);
      return {
        data : result,
        accessToken : req.user
      };
    } catch (error) {
      console.warn("Error", error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentsService.update(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentsService.remove(+id);
  }
}

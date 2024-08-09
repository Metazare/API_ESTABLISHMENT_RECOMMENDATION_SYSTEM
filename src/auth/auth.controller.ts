import { Controller, Post, UseGuards,Get, Req,Res ,BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request ,Response } from 'express';
import { JwtAuthGuard } from './guards/Jwt.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private UserService:UsersService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const {_id} = req.user as { _id:string};
    
    const refreshToken = await this.authService.generateRefreshToken(
      {_id}
    );
    const accessToken = this.authService.generateAccessToken(
      {refreshToken}
    );
    // Set the refresh token in an HTTP-only cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return {
      accessToken,
      userId:_id
    };
  }

  @Post('register')
  async register(@Req() req: Request){
    try{
      await this.UserService.create(req.body as CreateUserDto)
      return {
        message:"User created successfully"
      }   
    }catch(e){
      console.log(e)
      throw new BadRequestException(e.message)
    }
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: Request){
    try{
      const accessToken = req.user 
      const refreshTokenContent = this.authService.tokenDecoder(this.authService.tokenDecoder(accessToken).refreshToken)
      console.log(refreshTokenContent)
      return {
        accessToken:accessToken,
        userId:refreshTokenContent._id
      } 
    }catch(e){
      throw new BadRequestException(e.message)
    }
  }

  @Get('wew')
  // @UseGuards(JwtAuthGuard)
  async wew(){
    return "wew"
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');
    return { message: 'Loggedout' };
  }
}

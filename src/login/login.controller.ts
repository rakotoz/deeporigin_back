import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: any, @Res() res: any) {
    const result = await this.loginService.login(body);
    if (result) {
      res.send(result);
    } else {
      res.status(401).send('Invalid login');
    }
  }

  @Get()
  async checkToken(@Res() res: any) {
    const token = res.req.headers.access_token;
    const result = await this.loginService.checkToken(token);
    if (result) {
      res.send(result);
    } else {
      res.status(401).send('Invalid token');
    }
  }
}

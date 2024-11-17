import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() body: any, @Res() res: any) {
    const existedUser = await this.registerService.getUser(body);
    if (existedUser) {
      res.status(400).send('User already existed');
    } else {
      const newUser = this.registerService.register(body);
      res.status(200).send(newUser);
    }
  }
}

import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../const';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
    }),
    MongooseModule.forFeature([
      { name: 'Users', schema: userSchema, collection: 'Users' },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}

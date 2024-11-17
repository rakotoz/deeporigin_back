import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    MongooseModule.forRoot(
      'mongodb+srv://nodejs:12341234@cluster0.nfelx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

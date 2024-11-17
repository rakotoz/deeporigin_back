import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { chatSchema } from '../schemas/chat.schema';
import { userSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Chat', schema: chatSchema, collection: 'Chat' },
      { name: 'Users', schema: userSchema, collection: 'Users' },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

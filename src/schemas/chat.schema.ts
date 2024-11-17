import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Chat {
  @Prop()
  messages: [{ message: string; timestamp: Date; direction: string }];

  @Prop()
  userId: string;
}

export const chatSchema = SchemaFactory.createForClass(Chat);

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async newMessage(@Body() body: any, @Res() res: any, @Req() req: any) {
    const decodedToken = this.jwtService.decode(req.headers.access_token);
    await this.chatService.saveMessage(
      body.message,
      decodedToken.sub,
      body.activeChatId,
      'fromUser',
    );
    const generatedText = await this.chatService.generateText(
      body.message,
      decodedToken.sub,
      body.activeChatId,
    );
    await this.chatService.saveMessage(
      generatedText.text(),
      decodedToken.sub,
      body.activeChatId,
      'toUser',
    );
    res.send(JSON.stringify({ message: generatedText.text() }));
  }

  @Get()
  async getChats(@Req() req: any, @Res() res: any) {
    const decodedToken = this.jwtService.decode(req.headers.access_token);
    const chats = await this.chatService.getAllChats(decodedToken.sub);
    res.send(chats);
  }

  @Get('newChat')
  async newChat(@Body() body: any, @Res() res: any, @Req() req: any) {
    const decodedToken = this.jwtService.decode(req.headers.access_token);
    const newChat = await this.chatService.startNewChat(decodedToken.sub);
    res.send(newChat);
  }
}

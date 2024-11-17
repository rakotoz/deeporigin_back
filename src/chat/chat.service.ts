import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../const';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Chat } from '../schemas/chat.schema';

const userSessions = new Map();

@Injectable()
export class ChatService {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('Users') private readonly userModel: Model<User>,
  ) {}

  async generateText(prompt: string, userId: string, activeChatId: string) {
    const sessionsForUser = userSessions.get(userId);

    if (sessionsForUser) {
      const existingSession = sessionsForUser.find(
        (session) => session.id === activeChatId,
      );

      if (existingSession) {
        const result = await existingSession.session.sendMessage(prompt);
        return result.response;
      } else {
        const newSession = this.model.startChat();
        userSessions.set(userId, [
          ...sessionsForUser,
          {
            id: activeChatId,
            session: newSession,
          },
        ]);
      }
    } else {
      const newSession = this.model.startChat();
      userSessions.set(userId, [
        {
          id: activeChatId,
          session: newSession,
        },
      ]);
      const result = await newSession.sendMessage(prompt);
      return result.response;
    }
  }

  async saveMessage(
    message: string,
    userId: string,
    activeChatId: string,
    direction: string,
  ) {
    const user = await this.userModel.findOne({ _id: userId });
    const chat = await this.chatModel.findOne({ _id: activeChatId });
    if (!chat) {
      const newChat = new this.chatModel({
        userId,
        messages: [{ message, timestamp: new Date(), direction }],
      });
      await newChat.save();
      user.chats.push(newChat._id.toString());
      await user.save();
    } else {
      chat.messages.push({
        message,
        timestamp: new Date(),
        direction,
      });
      await chat.save();
    }
  }

  async getAllChats(userId: string) {
    const chats = await this.chatModel.find({ userId });
    return chats;
  }

  async startNewChat(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    const newSession = this.model.startChat();
    const newChat = new this.chatModel({
      userId,
      messages: [],
    });
    const savedChat = await newChat.save();
    userSessions.set(userId, [
      {
        id: savedChat._id,
        session: newSession,
      },
    ]);
    user.chats.push(newChat._id.toString());
    await user.save();
    return newChat;
  }
}

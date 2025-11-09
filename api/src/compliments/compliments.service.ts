import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import {
  CreateComplimentDto,
  CreateComplimentsDto,
} from './dto/create-compliment.dto';

@Injectable()
export class ComplimentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findUnusedByTopicId(topicId: string) {
    // Verify topic exists
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with id "${topicId}" not found`);
    }

    return this.prisma.compliment.findMany({
      where: {
        topicId,
        used: false,
      },
      orderBy: {
        createdAt: 'desc', // Latest first
      },
    });
  }

  async markAsUsed(id: string) {
    const compliment = await this.prisma.compliment.findUnique({
      where: { id },
    });

    if (!compliment) {
      throw new NotFoundException(`Compliment with id "${id}" not found`);
    }

    return this.prisma.compliment.update({
      where: { id },
      data: { used: true },
    });
  }

  async create(createComplimentDto: CreateComplimentDto) {
    // Verify topic exists
    await this.prisma.topic.findUniqueOrThrow({
      where: { id: createComplimentDto.topicId },
    });

    return this.prisma.compliment.create({
      data: {
        topicId: createComplimentDto.topicId,
        content: createComplimentDto.content,
        used: false,
      },
    });
  }

  async createMany(createComplimentsDto: CreateComplimentsDto) {
    // Verify topic exists
    await this.prisma.topic.findUniqueOrThrow({
      where: { id: createComplimentsDto.topicId },
    });

    return this.prisma.compliment.createMany({
      data: createComplimentsDto.contents.map(content => ({
        topicId: createComplimentsDto.topicId,
        content,
        used: false,
      })),
    });
  }
}

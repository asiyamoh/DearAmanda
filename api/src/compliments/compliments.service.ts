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
      },
      orderBy: {
        createdAt: 'desc', // Latest first
      },
    });
  }

  async markAsUsed(ids: string[]) {
    if (ids.length === 0) {
      return { count: 0 };
    }

    const result = await this.prisma.compliment.updateMany({
      where: {
        id: { in: ids },
      },
      data: { used: true },
    });

    return result;
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

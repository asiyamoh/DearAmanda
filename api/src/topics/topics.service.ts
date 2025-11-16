import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { generateSlug } from '../utils/slug';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.topic.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneBySlug(slug: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { slug },
      include: {
        compliments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with slug "${slug}" not found`);
    }

    return topic;
  }

  async findOneById(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with id "${id}" not found`);
    }

    return topic;
  }

  async create(createTopicDto: CreateTopicDto) {
    let slug = generateSlug(createTopicDto.name);

    // Check if slug already exists
    const existingTopic = await this.prisma.topic.findUnique({
      where: { slug },
    });

    if (existingTopic) {
      // If slug exists, append a number
      let counter = 1;
      let newSlug = `${slug}-${counter}`;
      while (await this.prisma.topic.findUnique({ where: { slug: newSlug } })) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }
      slug = newSlug;
    }

    return this.prisma.topic.create({
      data: {
        name: createTopicDto.name,
        slug,
        prompt: createTopicDto.prompt,
      },
    });
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    await this.findOneById(id); // Throws if not found

    const updateData: {
      name?: string;
      slug?: string;
      prompt?: string;
    } = {};

    if (updateTopicDto.name) {
      updateData.name = updateTopicDto.name;
      // Regenerate slug if name changes
      let slug = generateSlug(updateTopicDto.name);

      // Check if slug already exists for a different topic
      const existingTopic = await this.prisma.topic.findFirst({
        where: {
          slug,
          id: { not: id }, // Exclude current topic
        },
      });

      if (existingTopic) {
        // If slug exists, append a number
        let counter = 1;
        let newSlug = `${slug}-${counter}`;
        while (
          await this.prisma.topic.findFirst({
            where: {
              slug: newSlug,
              id: { not: id },
            },
          })
        ) {
          counter++;
          newSlug = `${slug}-${counter}`;
        }
        slug = newSlug;
      }

      updateData.slug = slug;
    }

    if (updateTopicDto.prompt) {
      updateData.prompt = updateTopicDto.prompt;
    }

    return this.prisma.topic.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    await this.findOneById(id); // Throws if not found

    return this.prisma.topic.delete({
      where: { id },
    });
  }
}

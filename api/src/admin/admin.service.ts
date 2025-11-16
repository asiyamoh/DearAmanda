import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AdminStatsDto, ComplimentStatsByTopicDto } from './dto/stats.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<AdminStatsDto> {
    // Get total compliments count
    const totalCompliments = await this.prisma.compliment.count();

    // Get viewed compliments count (where used = true)
    const complimentsViewed = await this.prisma.compliment.count({
      where: {
        used: true,
      },
    });

    // Get per-topic statistics using raw query for efficiency
    // This groups compliments by topic and counts total, viewed, and unused
    const topicStats = await this.prisma.$queryRaw<
      Array<{
        topic_id: string;
        topic_name: string;
        topic_slug: string;
        total: bigint;
        viewed: bigint;
        unused: bigint;
      }>
    >`
      SELECT 
        t.id as topic_id,
        t.name as topic_name,
        t.slug as topic_slug,
        COUNT(c.id)::bigint as total,
        COUNT(c.id) FILTER (WHERE c.used = true)::bigint as viewed,
        COUNT(c.id) FILTER (WHERE c.used = false)::bigint as unused
      FROM topics t
      LEFT JOIN compliments c ON c.topic_id = t.id
      GROUP BY t.id, t.name, t.slug
      ORDER BY t.name ASC
    `;

    // Transform raw query results to DTOs
    const complimentsByTopic: ComplimentStatsByTopicDto[] = topicStats.map(
      stat => ({
        topicId: stat.topic_id,
        topicName: stat.topic_name,
        topicSlug: stat.topic_slug,
        total: Number(stat.total),
        viewed: Number(stat.viewed),
        unused: Number(stat.unused),
      })
    );

    return {
      totalCompliments,
      complimentsViewed,
      complimentsByTopic,
    };
  }
}

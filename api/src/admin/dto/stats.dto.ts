/**
 * DTOs for admin statistics endpoints
 */

export class ComplimentStatsByTopicDto {
  topicId: string;
  topicName: string;
  topicSlug: string;
  total: number;
  viewed: number;
  unused: number;
}

export class AdminStatsDto {
  totalCompliments: number;
  complimentsViewed: number;
  complimentsByTopic: ComplimentStatsByTopicDto[];
}

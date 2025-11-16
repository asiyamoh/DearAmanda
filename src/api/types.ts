/**
 * TypeScript interfaces matching backend DTOs and Prisma models
 */

export interface Topic {
  id: string; // UUID
  name: string;
  slug: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  compliments?: Compliment[]; // Optional relation when fetched with includes
}

export interface Compliment {
  id: string; // UUID
  topicId: string;
  content: string;
  used: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTopicDto {
  name: string;
  prompt: string;
}

export interface UpdateTopicDto {
  name?: string;
  prompt?: string;
}

export interface CreateComplimentDto {
  topicId: string;
  content: string;
}

export interface CreateComplimentsDto {
  topicId: string;
  contents: string[];
}

export interface MarkComplimentsAsUsedDto {
  ids: string[];
}

export interface AdminStats {
  totalCompliments: number;
  complimentsViewed: number;
  favorites: number;
  uniqueUsers: number;
}

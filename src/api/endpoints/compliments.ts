/**
 * Compliments API endpoints
 */

import { apiGet, apiPost, apiPatch } from '../client';
import type {
  Compliment,
  CreateComplimentDto,
  CreateComplimentsDto,
  MarkComplimentsAsUsedDto,
} from '../types';

/**
 * Get unused compliments by topic ID
 */
export async function getComplimentsByTopicId(
  topicId: string
): Promise<Compliment[]> {
  const result = await apiGet<Compliment[]>(`/compliments/topic/${topicId}`);
  return result;
}

/**
 * Create a single compliment
 */
export async function createCompliment(
  data: CreateComplimentDto
): Promise<Compliment> {
  return apiPost<Compliment>('/compliments', data);
}

/**
 * Create multiple compliments in batch
 */
export async function createComplimentsBatch(
  data: CreateComplimentsDto
): Promise<{ count: number }> {
  return apiPost<{ count: number }>('/compliments/batch', data);
}

/**
 * Mark multiple compliments as used (batch)
 */
export async function markComplimentsAsUsed(
  ids: string[]
): Promise<{ count: number }> {
  const data: MarkComplimentsAsUsedDto = { ids };
  return apiPatch<{ count: number }>('/compliments/used', data);
}

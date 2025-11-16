/**
 * Compliments API endpoints
 */

import { apiGet, apiPost, apiPatch, apiDelete } from '../client';
import type {
  Compliment,
  CreateComplimentDto,
  CreateComplimentsDto,
  MarkComplimentsAsUsedDto,
  UpdateComplimentDto,
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

/**
 * Update a single compliment
 */
export async function updateCompliment(
  id: string,
  data: UpdateComplimentDto
): Promise<Compliment> {
  return apiPatch<Compliment>(`/compliments/${id}`, data);
}

/**
 * Delete a single compliment
 */
export async function deleteCompliment(id: string): Promise<void> {
  return apiDelete<void>(`/compliments/${id}`);
}

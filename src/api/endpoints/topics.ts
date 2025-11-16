/**
 * Topics API endpoints
 */

import { apiGet, apiPost, apiPatch, apiDelete } from '../client';
import type { Topic, CreateTopicDto, UpdateTopicDto } from '../types';

/**
 * Get all topics
 */
export async function getTopics(): Promise<Topic[]> {
  return apiGet<Topic[]>('/topics');
}

/**
 * Get topic by slug
 */
export async function getTopicBySlug(slug: string): Promise<Topic> {
  return apiGet<Topic>(`/topics/${slug}`);
}

/**
 * Create a new topic
 */
export async function createTopic(data: CreateTopicDto): Promise<Topic> {
  return apiPost<Topic>('/topics', data);
}

/**
 * Update a topic
 */
export async function updateTopic(
  id: string,
  data: UpdateTopicDto
): Promise<Topic> {
  return apiPatch<Topic>(`/topics/${id}`, data);
}

/**
 * Delete a topic
 */
export async function deleteTopic(id: string): Promise<void> {
  return apiDelete<void>(`/topics/${id}`);
}

/**
 * Admin API endpoints
 */

import { apiGet } from '../client';
import type { AdminStats } from '../types';

/**
 * Get admin statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  return apiGet<AdminStats>('/admin/stats');
}

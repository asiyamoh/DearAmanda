/**
 * Admin API endpoints
 *
 * Note: Admin stats endpoint may need to be created in the backend
 * For now, this is a placeholder structure
 */

import type { AdminStats } from '../types';

/**
 * Get admin statistics
 *
 * TODO: This endpoint needs to be implemented in the backend
 * For now, returns a placeholder that can be calculated client-side
 */
export async function getAdminStats(): Promise<AdminStats> {
  // TODO: Replace with actual endpoint when backend implements it
  // return apiGet<AdminStats>('/admin/stats');

  // Placeholder - will be replaced when backend endpoint is ready
  throw new Error('Admin stats endpoint not yet implemented in backend');
}

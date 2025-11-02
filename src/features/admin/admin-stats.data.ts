/**
 * Fake data for admin dashboard statistics
 * This file can be easily replaced with a Supabase query later
 *
 */

export interface AdminStats {
  totalCompliments: number;
  complimentsViewed: number;
  favorites: number;
  uniqueUsers: number;
}

/**
 * Sample data matching the wireframe values
 * Replace this with actual database queries when ready
 */
export const adminStats: AdminStats = {
  totalCompliments: 5470,
  complimentsViewed: 3892,
  favorites: 1735,
  uniqueUsers: 412,
};

/**
 * Sample chart data for each stat (for bar charts)
 * These would typically be derived from time-series data from the database
 */
export const getStatChartData = (statType: keyof AdminStats): number[] => {
  // Generate sample chart data - in real implementation, this would come from database
  const baseValues: Record<keyof AdminStats, number[]> = {
    totalCompliments: [420, 580, 650, 720, 680, 750, 820, 890, 950, 1020],
    complimentsViewed: [310, 420, 480, 550, 520, 590, 640, 680, 720, 780],
    favorites: [120, 150, 180, 200, 190, 210, 230, 250, 270, 285],
    uniqueUsers: [28, 35, 42, 48, 45, 52, 58, 62, 68, 75],
  };

  return baseValues[statType] || [];
};

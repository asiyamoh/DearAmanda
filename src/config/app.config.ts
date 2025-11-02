/**
 * Application configuration and environment variables
 *
 * Access environment variables through this config object.
 * All variables are prefixed with VITE_ to be accessible in client-side code.
 */

interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  openai: {
    apiKey: string;
  };
  isDev: boolean;
  isProd: boolean;
}

/**
 * Validates that required environment variables are present
 */
function validateEnv(): void {
  const env = import.meta.env;
  const placeholders = [
    'your_supabase_project_url_here',
    'your_supabase_anon_key_here',
    'your_openai_api_key_here',
  ];

  const required = [
    { key: 'VITE_SUPABASE_URL', value: env.VITE_SUPABASE_URL },
    { key: 'VITE_SUPABASE_ANON_KEY', value: env.VITE_SUPABASE_ANON_KEY },
    { key: 'VITE_OPENAI_API_KEY', value: env.VITE_OPENAI_API_KEY },
  ];

  const missing = required.filter(
    item =>
      !item.value ||
      item.value.trim() === '' ||
      placeholders.some(placeholder => item.value?.includes(placeholder))
  );

  if (missing.length > 0) {
    console.warn(
      `⚠️  Environment variables not configured: ${missing.map(m => m.key).join(', ')}`
    );
    console.info('💡 Copy .env.example to .env and fill in your actual values');
  }
}

/**
 * Application configuration object
 * Access environment variables via import.meta.env in Vite
 */
export const config: AppConfig = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  },
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

// Validate environment variables on module load
validateEnv();

// Export individual config sections for convenience
export const supabaseConfig = config.supabase;
export const openaiConfig = config.openai;

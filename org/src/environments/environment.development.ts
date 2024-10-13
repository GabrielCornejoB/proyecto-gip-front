export const environment = {
  production: false,
  API_URL: 'http://127.0.0.1:8000',
  SUPABASE_KEY: process.env['SUPABASE_URL']!,
  SUPABASE_URL: process.env['SUPABASE_KEY']!,
};

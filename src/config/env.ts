import { config } from 'dotenv';
import z from 'zod';
config();

const envSchema = z.object({
  PORT: z.string().default('8000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  ACCOUNT_NAME: z.string().min(1),
  ACCOUNT_KEY: z.string().min(1),
  CONTAINER: z.string().min(1),
  SALESFORCE_INSTANCE_URL: z.url(),
  SALESFORCE_ACCESS_TOKEN: z.string(),
  SALESFORCE_API_VERSION: z.string().default('v56.0'),
  SALESFORCE_MEDIA_SOBJECT: z.string().default('ContentVersion'),
});

export default envSchema.parse(process.env as z.infer<typeof envSchema>);

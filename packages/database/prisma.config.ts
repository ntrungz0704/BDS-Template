import { defineConfig } from 'prisma/config';
import path from 'path';

// Load environment variables from root .env
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

export default defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg');
      const { Pool } = await import('pg');
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      return new PrismaPg(pool);
    },
  },
});

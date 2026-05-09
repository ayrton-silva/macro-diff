import Fastify from 'fastify'
import "dotenv/config";
import { registerRoutes } from './routes/index.js'

import { PrismaClient } from '../prisma/generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

export async function buildApp() {
  const app = Fastify({
    logger: {
      serializers: {
        req: function (req) {
          return { url: req.url }
        },
      },
      formatters: {
        bindings: () => ({}),
        level: () => ({})
      },
      timestamp: () => `"time":"${new Date().toISOString()}"`,

    }
  })
  await registerRoutes(app)

  return app
}

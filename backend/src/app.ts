import Fastify from 'fastify'
import "dotenv/config";
import { registerRoutes } from './routes/index.js'
import { PrismaClient } from '../prisma/generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

import fastifySwagger from '@fastify/swagger';
import fastifyAutoload from '@fastify/autoload';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

export const memoryMatchData = new Map()

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
  
  await app.register(fastifySwagger)
  await app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes')
  })
  
  await registerRoutes(app)
  
  await app.ready()
  app.swagger()

  return app
}

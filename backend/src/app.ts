import Fastify from 'fastify'
import "dotenv/config";
import { registerRoutes } from './routes/index.js'

import { PrismaClient } from '../prisma/generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export async function buildApp() {
  const app = Fastify({ logger: true })
  await registerRoutes(app)
  const prisma = new PrismaClient({ adapter });
  //const response = await prisma.summoner.findMany()
  //console.log(response)

  return app
}

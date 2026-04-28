import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './health.js'
import { rootRoutes } from './root.js'
import { summonersRoutes } from './summoners.js'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(rootRoutes)
  await app.register(healthRoutes)
  await app.register(summonersRoutes)
}

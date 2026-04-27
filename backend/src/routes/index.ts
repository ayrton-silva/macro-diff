import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './health.js'
import { matchRoutes } from './matches.js'
import { rootRoutes } from './root.js'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(rootRoutes)
  await app.register(healthRoutes)
  await app.register(matchRoutes, { prefix: '/matches' })
}

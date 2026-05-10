import fastifySwaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify'

export async function swaggerRoute(app: FastifyInstance) {
    app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
    })
}

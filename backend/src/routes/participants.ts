import type { FastifyInstance } from 'fastify'
import { createParticipants } from '../repositories/riotParticipants.repositories'

/** Rotas de exemplo para match + timeline (corpo vazio / stub). */

//http://localhost:3001/participants/<matchId>

export async function participantsRoutes(app: FastifyInstance) {
  app.get('/participants/:matchId', async (request) => {
    const { matchId } = request.params as { matchId: string }
    console.log(matchId)
    const response = await createParticipants(matchId)
    console.log("Participantes Created!")
    return response
  })
}

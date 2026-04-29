import type { FastifyInstance } from 'fastify'
import {
  createMatches,
  readMatch,
} from '../repositories/riotMatches.repositories'

/** Rotas de exemplo para match + timeline (corpo vazio / stub). */

//http://localhost:3001/matches/-Wj7wFERxJTf8fIj0qNENBY1WzrBGsSzRF6o09mwZfpL5M7GTrnvA11RE34N4mU0MCoNnsQhnoQvbw?numberOfMatches=1

export async function matchesRoutes(app: FastifyInstance) {
  app.get('/matches/:puuid', async (request) => {
    const { puuid } = request.params as { puuid: string }
    const { numberOfMatches } = request.query as { numberOfMatches: number }

    const response = await createMatches({
      puuid: puuid,
      numberOfMatches: numberOfMatches,
    })

    return response
  })

  app.get('/match/:matchId', async (request) => {
    const { matchId } = request.params as { matchId: string }

    const response = await readMatch(matchId)

    return response
  })
}

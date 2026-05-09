import type { FastifyInstance } from 'fastify'
import {
  createMatches,
  getExistentMatches,
  readMatch,
} from '../repositories/riotMatches.repositories'

/** Rotas de exemplo para match + timeline (corpo vazio / stub). */

//http://localhost:3001/matches/-Wj7wFERxJTf8fIj0qNENBY1WzrBGsSzRF6o09mwZfpL5M7GTrnvA11RE34N4mU0MCoNnsQhnoQvbw?numberOfMatches=3&skip=3

export async function matchesRoutes(app: FastifyInstance) {
  app.get('/matches/:puuid', async (request) => {
    const { puuid } = request.params as { puuid: string }
    const { numberOfMatches, skip } = request.query as { numberOfMatches: number, skip: number }

    request.log.info({ puuid, numberOfMatches, skip },'Requesting matches for puuid')

    const response = await createMatches({
      puuid: puuid,
      numberOfMatches: +numberOfMatches,
      skip: +skip
    })

    return response
  })

  app.get('/existentMatches/:puuid', async (request) => {
    const { puuid } = request.params as { puuid: string }
    const { numberOfMatches, skip } = request.query as { numberOfMatches: number, skip: number }

    request.log.info({ puuid, numberOfMatches, skip },'Requesting existentMatches for puuid')
    
    const response = await getExistentMatches({
      puuid: puuid,
      numberOfMatches: +numberOfMatches,
      skip: +skip
    })

    request.log.info(response,'Response from getExistentMatches')
    
    if(response.length < numberOfMatches){
      await createMatches({
        puuid: puuid,
        numberOfMatches: +numberOfMatches,
        skip: +skip
      })
      const responseData = await getExistentMatches({
        puuid: puuid,
        numberOfMatches: +numberOfMatches,
        skip: +skip
      })
      request.log.info(responseData,'Response from getExistentMatches after createMatches')
      return responseData
    }
    return response
  })
  
  app.get('/match/:matchId', async (request) => {
    const { matchId } = request.params as { matchId: string }
    request.log.info({matchId},'Requesting data for matchId')
    
    const response = await readMatch(matchId)
    request.log.info({'matchId' : response?.matchId, 'gameDuration' : response?.gameDuration, 'participants': response?.participants.map((data)=> data.summoner.gameName)},'Response from readMatch Data')

    return response
  })
}

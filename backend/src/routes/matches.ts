import type { FastifyInstance } from 'fastify'
import {
  createMatches,
  getExistentMatches,
  readMatch,
} from '../repositories/riotMatches.repositories'
import { getAllMatchesByPuuid } from '../services/riotMatchService'

/** Rotas de exemplo para match + timeline (corpo vazio / stub). */

//http://localhost:3001/matches/-Wj7wFERxJTf8fIj0qNENBY1WzrBGsSzRF6o09mwZfpL5M7GTrnvA11RE34N4mU0MCoNnsQhnoQvbw?numberOfMatches=3&skip=3

export async function matchesRoutes(app: FastifyInstance) {
  app.get('/matches/:puuid', async (request) => {
    const { puuid } = request.params as { puuid: string }
    const { numberOfMatches, endTime } = request.query as {
      numberOfMatches: number
      endTime: string
    }

    request.log.info(
      { puuid, numberOfMatches, endTime },
      'Requesting matches for puuid',
    )

    const response = await createMatches({
      puuid: puuid,
      numberOfMatches: +numberOfMatches,
    })

    return response
  })

  app.get('/existentMatches/:puuid', async (request) => {
    const { puuid } = request.params as { puuid: string }
    const { numberOfMatches, cursor } = request.query as {
      numberOfMatches: number
      cursor: string
    }

    const listOfMatches = await getAllMatchesByPuuid({puuid});

    const cursorStart = listOfMatches.indexOf(cursor)

    request.log.info(
      { puuid, numberOfMatches, cursor },
      'Requesting existentMatches for puuid',
    )

    const response = await getExistentMatches({
      puuid: puuid,
      numberOfMatches: +numberOfMatches,
      cursor: cursor,
    })

    request.log.info(response, 'Response from getExistentMatches')

    for (let i = 0; i < numberOfMatches; i++) {
      if(response.data.filter((data)=> data.matchId == listOfMatches.slice(cursorStart+1+i,cursorStart+2+i)[0]).length < 1){
        await createMatches({
        puuid: puuid,
        numberOfMatches: 1,
        start: cursorStart+1+i
      })
      }
    }
    const responseData = await getExistentMatches({
        puuid: puuid,
        numberOfMatches: +numberOfMatches,
        cursor: cursor,
      })

    request.log.info(
    responseData,
      'Response from getExistentMatches after createMatches',
    )
    return responseData
/* 
    request.log.info(response, 'Response from getExistentMatches')

    if (response.data.length < numberOfMatches) {
      await createMatches({
        puuid: puuid,
        numberOfMatches: +numberOfMatches,
        start: cursorStart
      })
      const responseData = await getExistentMatches({
        puuid: puuid,
        numberOfMatches: +numberOfMatches,
        cursor: cursor,
      })
      request.log.info(
        responseData,
        'Response from getExistentMatches after createMatches',
      )

      return responseData
    }

    return response */
  })

  app.get('/getAllMatches/:puuid', async (request) => {
    const { puuid } = request.params as { puuid: string }

    const response = await getAllMatchesByPuuid({ puuid: puuid })

    return { data: response, count: response.length }
  })

  app.get('/match/:matchId', async (request) => {
    const { matchId } = request.params as { matchId: string }
    request.log.info({ matchId }, 'Requesting data for matchId')

    const response = await readMatch(matchId)
    request.log.info(
      {
        matchId: response?.matchId,
        gameDuration: response?.gameDuration,
        participants: response?.participants.map(
          (data) => data.summoner.gameName,
        ),
      },
      'Response from readMatch Data',
    )

    return response
  })
}

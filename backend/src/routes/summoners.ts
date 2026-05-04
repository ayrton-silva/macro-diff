import type { FastifyInstance } from 'fastify'
import {
  createSummoner,
  readAllSummoners,
  readSummoner,
  readSummonerByName,
  searchSummoner,
} from '../repositories/riotAccount.repositories'
import type { RiotAccountRequest } from '../dto/riotAccountDto'

export async function summonersRoutes(app: FastifyInstance) {
  app.get('/summoners', async () => {
    const summoners = await readAllSummoners()

    return summoners
  })

  app.get('/summoners/:summonerId', async (request) => {
    const { summonerId } = request.params as { summonerId: string }
    const summoner = await readSummoner(summonerId)

    return summoner
  })

  app.get('/summoners/search', async (request) => {
    const {  gameName, tagLine, region = 'americas'} = request.query as {  gameName: string,tagLine: string, region: string}

    const summoner = await searchSummoner({gameName, tagLine, region})

    if(summoner?.summonerExactlyMatch.length == 0 && gameName && tagLine && region){
      const response = await createSummoner({gameName, tagLine, region})
      console.log("Creating Summoner: ",{gameName, tagLine, region})
      return response
    }
    return summoner
  })

  app.post('/summoners', async (request) => {
    const { gameName, tagLine, region } = request.body as RiotAccountRequest
    const summoner = await createSummoner({ gameName, tagLine, region })

    return summoner
  })

  
  app.get('/summoner', async (request) => {
    const { gameName, tagLine, region } = request.query as RiotAccountRequest
    const summoner = await readSummonerByName({gameName, tagLine, region})

    return summoner
  })
}

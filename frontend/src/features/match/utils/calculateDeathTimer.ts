import { returnTime } from '#/shared/game/helpers'

function calculateBRW(level: number, currentTimestamp: number) {
  const gameSeconds = currentTimestamp / 1000
  const deathTimerByLevel = {
    '1': 10,
    '2': 10,
    '3': 12,
    '4': 12,
    '5': 14,
    '6': 16,
    '7': 20,
    '8': 25,
    '9': 28,
    '10': 32.5,
    '11': 35,
    '12': 37.5,
    '13': 40,
    '14': 42.5,
    '15': 45,
    '16': 47.5,
    '17': 50,
    '18': 52.5,
    '19': 52.5,
    '20': 52.5,
  }

  let tif = 0

  if (gameSeconds < 15 * 60) {
    return deathTimerByLevel[level.toString()]
  }

  if (gameSeconds >= 15 * 60 && gameSeconds <= 29.59 * 60) {
    tif = (0.425 + 0.425 * Math.ceil((gameSeconds - 15 * 60) / 30)) / 100
  }

  if (gameSeconds >= 30 * 60 && gameSeconds <= 44.59 * 60) {
    tif = (12.75 + 0.3 * Math.ceil((gameSeconds - 30 * 60) / 30)) / 100
  }

  if (gameSeconds >= 45 * 60) {
    tif = (21.75 + 1.45 * Math.ceil((gameSeconds - 45 * 60) / 30)) / 100
  }

  if (tif > 0.5) {
    tif = 0.5
  }

  return Math.round(
    deathTimerByLevel[level.toString()] +
      deathTimerByLevel[level.toString()] * tif,
  )
}

export function calculateDeathTimer(
  level: number,
  lastDeath: number,
  currentTimestamp: number,
) {
  const gameSeconds = currentTimestamp / 1000
  const lastDeathSeconds = lastDeath / 1000

  const brw = calculateBRW(level, lastDeath)
  const gameAndDeathSecondsDiff = gameSeconds - lastDeathSeconds

  //BR1_3248980890
  console.log('brw', brw)
  console.log('game seocnds', returnTime(currentTimestamp))
  console.log('last death', returnTime(lastDeath))

  if (gameAndDeathSecondsDiff <= brw) {
    return Math.round(brw - gameAndDeathSecondsDiff)
  } else {
    return 0
  }
}

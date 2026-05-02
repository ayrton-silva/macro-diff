export async function fetchChampions() {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/16.9.1/data/en_US/champion.json`,
  )

  return await response.json()
}

export async function fetchSummonerSpells() {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/16.9.1/data/en_US/summoner.json`,
  )

  return await response.json()
}

export async function fetchItems() {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/16.9.1/data/en_US/item.json`,
  )

  return await response.json()
}

export async function fetchProfileIcons() {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/16.9.1/data/en_US/profileicon.json`,
  )

  return await response.json()
}

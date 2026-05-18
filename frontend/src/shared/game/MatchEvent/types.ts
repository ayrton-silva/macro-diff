export type MatchEvent = {
  eventId: number
  timestamp: number
  type: string
  creatorId?: string
  wardType?: string
  itemId?: number
  participantPuuid?: string
  teamId?: TeamId
  victimId?: string
  killerId?: string
  killType?: string
  positionx?: number
  positiony?: number
  monsterSubType?: string
  monsterType?: string
  matchTimeline: string
  matchTimelineId: string
}

export type Participant = {
  summonerId: string
  championName: string
  champLevel: number
  assists: number
  deaths: number
  kills: number
  lane: string
  teamPosition: string
  summoner1Id: number
  summoner2Id: number
  totalMinionsKilled: number
  totalDamageDealtToChampions: number
  wardsPlaced: number
  goldEarned: number
  riotIdGameName: string
  riotIdTagline: string
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  perksStat0: number
  perksStat1: number
  perksStat2: number
  perksPrimaryStyle: number
  perksPrimaryStyleSelection0: number
  perksPrimaryStyleSelection1: number
  perksPrimaryStyleSelection2: number
  perksPrimaryStyleSelection3: number
  perksSubStyle: number
  perksSubStyleSelection0: number
  perksSubStyleSelection1: number
  summoner: {
    gameName: string
    tagLine: string
    region: string
  }
  teamId: TeamId
  win: boolean
}

export type TeamId = 100 | 200


export const perkImageNames = {
  "Domination": {
    8100: "7200_Domination",
    8112: "Electrocute",
    8128: "DarkHarvest",
    9923: "HailOfBlades",
    8126: "CheapShot",
    8139: "TasteOfBlood",
    8143: "SuddenImpact",
    8137: "SixthSense",
    8140: "GrislyMementos",
    8141: "DeepWard",
    8135: "TreasureHunter",
    8105: "RelentlessHunter",
    8106: "UltimateHunter",
  },
  "Inspiration": {
    8300: "7203_Whimsy",
    8351: "GlacialAugment",
    8360: "UnsealedSpellbook",
    8369: "FirstStrike",
    8306: "HextechFlashtraption",
    8304: "MagicalFootwear",
    8321: "CashBack",
    8313: "PerfectTiming",
    8352: "TimeWarpTonic",
    8345: "BiscuitDelivery",
    8347: "CosmicInsight",
    8410: "ApproachVelocity",
    8316: "JackOfAllTrades",
  },
  "Precision": {
    8000: "7201_Precision",
    8005: "PressTheAttack",
    8008: "LethalTempo",
    8021: "FleetFootwork",
    8010: "Conqueror",
    9101: "AbsorbLife",
    9111: "Triumph",
    8009: "PresenceOfMind",
    9104: "LegendAlacrity",
    9105: "LegendHaste",
    9103: "LegendBloodline",
    8014: "CoupDeGrace",
    8017: "CutDown",
    8299: "LastStand",
  },
  "Resolve": {
    8400: "7204_Resolve",
    8437: "GraspOfTheUndying",
    8439: "Aftershock",
    8465: "Guardian",
    8446: "Demolish",
    8463: "FontOfLife",
    8401: "ShieldBash",
    8429: "Conditioning",
    8444: "SecondWind",
    8473: "BonePlating",
    8451: "Overgrowth",
    8453: "Revitalize",
    8242: "Unflinching",
  },
  "Sorcery": {
    8200: "7202_Sorcery",
    8214: "SummonAery",
    8229: "ArcaneComet",
    8230: "PhaseRush",
    8992: "DeathfireTouch",
    8224: "NullifyingOrb",
    8226: "ManaflowBand",
    8275: "NimbusCloak",
    8210: "Transcendence",
    8234: "Celerity",
    8233: "AbsoluteFocus",
    8237: "Scorch",
    8232: "Waterwalking",
    8236: "GatheringStorm",
  },
  "StatMods": {
    5008: "AdaptiveForce",
    5005: "AttackSpeed",
    5007: "AbilityHaste",
    5010: "MoveSpeed",
    5001: "HealthScaling",
    5011: "Health",
    5013: "TenacityAndSlowResist",
  }
};
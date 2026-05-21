export type MatchEvent = {
  eventId: number
  timestamp: number
  type: EventType
  creatorId?: string
  wardType?: string
  itemId?: number
  participantPuuid?: string
  teamId?: TeamId
  victimId?: string
  assistingParticipantIds: string[]
  killerId?: string
  killType?: string
  positionx?: number
  positiony?: number
  monsterSubType?: string
  monsterType?: string
  matchTimeline: string
  matchTimelineId: string
  towerType?: string
  buildingType?: string
  multiKillLength?: number
  laneType?: string
}

export type ParticipantFrames = {
    id:number
    participantFrameId:number
    participantPuuid:string
    timestamp:number
    positionx:number
    positiony:number
    level:number
    minionsKilled:number
    totalGold:number
    totalDamageDoneToChampions:number
    matchTimelineId:string
}

export type Participant = {
  summonerId: string
  championName: string
  champLevel: number
  assists: number
  deaths: number
  kills: number
  lane: string
  teamPosition: "TOP"| "JUNGLE"| "MIDDLE" |"BOTTOM" |"UTILITY"
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

export type EventType =
  | 'LEVEL_UP'
  | 'PAUSE_END'
  | 'ITEM_DESTROYED'
  | 'ITEM_PURCHASED'
  | 'SKILL_LEVEL_UP'
  | 'WARD_PLACED'
  | 'TURRET_PLATE_DESTROYED'
  | 'BUILDING_KILL'
  | 'CHAMPION_KILL'
  | 'CHAMPION_SPECIAL_KILL'
  | 'ELITE_MONSTER_KILL'

export type TeamId = 100 | 200

export const perkImageNames = {
  Domination: {
    8100: { name: '7200_Domination', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/7200_Domination.png' },
    8112: { name: 'Electrocute', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/Electrocute/Electrocute.png' },
    8128: { name: 'DarkHarvest', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png' },
    9923: { name: 'HailOfBlades', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png' },
    8126: { name: 'CheapShot', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/CheapShot/CheapShot.png' },
    8139: { name: 'TasteOfBlood', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png' },
    8143: { name: 'SuddenImpact', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png' },
    8137: { name: 'SixthSense', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/SixthSense/SixthSense.png' },
    8140: { name: 'GrislyMementos', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/GrislyMementos/GrislyMementos.png' },
    8141: { name: 'DeepWard', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/DeepWard/DeepWard.png' },
    8135: { name: 'TreasureHunter', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png' },
    8105: { name: 'RelentlessHunter', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png' },
    8106: { name: 'UltimateHunter', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png' },
  },
  Inspiration: {
    8300: { name: '7203_Whimsy', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/7203_Whimsy.png' },
    8351: { name: 'GlacialAugment', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png' },
    8360: { name: 'UnsealedSpellbook', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png' },
    8369: { name: 'FirstStrike', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png' },
    8306: { name: 'HextechFlashtraption', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png' },
    8304: { name: 'MagicalFootwear', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png' },
    8321: { name: 'CashBack', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/CashBack/CashBack2.png' },
    8313: { name: 'PerfectTiming', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/PerfectTiming/AlchemistCabinet.png' },
    8352: { name: 'TimeWarpTonic', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png' },
    8345: { name: 'BiscuitDelivery', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png' },
    8347: { name: 'CosmicInsight', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png' },
    8410: { name: 'ApproachVelocity', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png' },
    8316: { name: 'JackOfAllTrades', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Inspiration/JackOfAllTrades/JackofAllTrades2.png' },
  },
  Precision: {
    8000: { name: '7201_Precision', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/7201_Precision.png' },
    8005: { name: 'PressTheAttack', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png' },
    8008: { name: 'LethalTempo', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png' },
    8021: { name: 'FleetFootwork', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png' },
    8010: { name: 'Conqueror', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/Conqueror/Conqueror.png' },
    9101: { name: 'AbsorbLife', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/AbsorbLife/AbsorbLife.png' },
    9111: { name: 'Triumph', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/Triumph.png' },
    8009: { name: 'PresenceOfMind', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png' },
    9104: { name: 'LegendAlacrity', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png' },
    9105: { name: 'LegendHaste', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/LegendHaste/LegendHaste.png' },
    9103: { name: 'LegendBloodline', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png' },
    8014: { name: 'CoupDeGrace', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png' },
    8017: { name: 'CutDown', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Precision/CutDown/CutDown.png' },
    8299: { name: 'LastStand', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/LastStand/LastStand.png' },
  },
  Resolve: {
    8400: { name: '7204_Resolve', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/7204_Resolve.png' },
    8437: { name: 'GraspOfTheUndying', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png' },
    8439: { name: 'Aftershock', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png' },
    8465: { name: 'Guardian', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/Guardian/Guardian.png' },
    8446: { name: 'Demolish', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/Demolish/Demolish.png' },
    8463: { name: 'FontOfLife', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png' },
    8401: { name: 'ShieldBash', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/MirrorShell/MirrorShell.png' },
    8429: { name: 'Conditioning', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/Conditioning/Conditioning.png' },
    8444: { name: 'SecondWind', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/SecondWind/SecondWind.png' },
    8473: { name: 'BonePlating', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/BonePlating/BonePlating.png' },
    8451: { name: 'Overgrowth', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png' },
    8453: { name: 'Revitalize', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Resolve/Revitalize/Revitalize.png' },
    8242: { name: 'Unflinching', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/Unflinching/Unflinching.png' },
  },
  Sorcery: {
    8200: { name: '7202_Sorcery', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/7202_Sorcery.png' },
    8214: { name: 'SummonAery', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/SummonAery/SummonAery.png' },
    8229: { name: 'ArcaneComet', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png' },
    8230: { name: 'PhaseRush', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/PhaseRush/StormraidersSurgeRuneIcon2.png' },
    8992: { name: 'DeathfireTouch', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/DeathfireTouch/DEATHFIRE_TOUCH_KEYSTONE.png' },
    8224: { name: 'NullifyingOrb', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/NullifyingOrb/Axiom_Arcanist.png' },
    8226: { name: 'ManaflowBand', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png' },
    8275: { name: 'NimbusCloak', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/NimbusCloak/6361.png' },
    8210: { name: 'Transcendence', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/Transcendence/Transcendence.png' },
    8234: { name: 'Celerity', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/Celerity/CelerityTemp.png' },
    8233: { name: 'AbsoluteFocus', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png' },
    8237: { name: 'Scorch', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/Scorch/Scorch.png' },
    8232: { name: 'Waterwalking', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png' },
    8236: { name: 'GatheringStorm', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png' },
  },
  StatMods: {
    5008: { name: 'AdaptiveForce', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsAdaptiveForceIcon.png' },
    5005: { name: 'AttackSpeed', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsAttackSpeedIcon.png' },
    5007: { name: 'AbilityHaste', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsCDRScalingIcon.png' },
    5010: { name: 'MoveSpeed', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsMovementSpeedIcon.png' },
    5001: { name: 'HealthScaling', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsHealthScalingIcon.png' },
    5011: { name: 'Health', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsHealthPlusIcon.png' },
    5013: { name: 'TenacityAndSlowResist', url: 'https://cdn.darkintaqt.com/lol/c-assets/perk-images/StatMods/StatModsTenacityIcon.png' },
  },
}

/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LeagueQueueType" AS ENUM ('RANKED_SOLO_5x5', 'RANKED_FLEX_SR');

-- CreateEnum
CREATE TYPE "LeagueTier" AS ENUM ('IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER');

-- CreateEnum
CREATE TYPE "LeagueRank" AS ENUM ('I', 'II', 'III', 'IV');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Summoner" (
    "id" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummonerLeague" (
    "id" TEXT NOT NULL,
    "queueType" "LeagueQueueType" NOT NULL,
    "tier" "LeagueTier" NOT NULL,
    "rank" "LeagueRank" NOT NULL,
    "summonerId" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,

    CONSTRAINT "SummonerLeague_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SummonerLeague" ADD CONSTRAINT "SummonerLeague_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "Summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Changed the type of `queueType` on the `SummonerLeague` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tier` on the `SummonerLeague` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rank` on the `SummonerLeague` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SummonerLeague" DROP COLUMN "queueType",
ADD COLUMN     "queueType" TEXT NOT NULL,
DROP COLUMN "tier",
ADD COLUMN     "tier" TEXT NOT NULL,
DROP COLUMN "rank",
ADD COLUMN     "rank" TEXT NOT NULL;

-- DropEnum
DROP TYPE "LeagueQueueType";

-- DropEnum
DROP TYPE "LeagueRank";

-- DropEnum
DROP TYPE "LeagueTier";

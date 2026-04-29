/*
  Warnings:

  - You are about to drop the column `participantsId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_participantsId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "participantsId";

-- DropTable
DROP TABLE "Participants";

-- CreateTable
CREATE TABLE "Participant" (
    "summonerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "championName" TEXT NOT NULL,
    "lane" TEXT NOT NULL,
    "summoner1Id" BIGINT NOT NULL,
    "summoner2Id" BIGINT NOT NULL,
    "totalMinionsKilled" BIGINT NOT NULL,
    "totalDamageDealtToChampions" BIGINT NOT NULL,
    "wardsPlaced" BIGINT NOT NULL,
    "goldEarned" BIGINT NOT NULL,
    "item0" BIGINT NOT NULL,
    "item1" BIGINT NOT NULL,
    "item2" BIGINT NOT NULL,
    "item3" BIGINT NOT NULL,
    "item4" BIGINT NOT NULL,
    "item5" BIGINT NOT NULL,
    "item6" BIGINT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("summonerId","matchId")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "Summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

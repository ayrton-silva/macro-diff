/*
  Warnings:

  - You are about to alter the column `gameDuration` on the `Match` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `summoner1Id` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `summoner2Id` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalMinionsKilled` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalDamageDealtToChampions` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `wardsPlaced` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `goldEarned` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item0` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item1` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item2` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item3` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item4` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item5` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `item6` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "gameDuration" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "summoner1Id" SET DATA TYPE INTEGER,
ALTER COLUMN "summoner2Id" SET DATA TYPE INTEGER,
ALTER COLUMN "totalMinionsKilled" SET DATA TYPE INTEGER,
ALTER COLUMN "totalDamageDealtToChampions" SET DATA TYPE INTEGER,
ALTER COLUMN "wardsPlaced" SET DATA TYPE INTEGER,
ALTER COLUMN "goldEarned" SET DATA TYPE INTEGER,
ALTER COLUMN "item0" SET DATA TYPE INTEGER,
ALTER COLUMN "item1" SET DATA TYPE INTEGER,
ALTER COLUMN "item2" SET DATA TYPE INTEGER,
ALTER COLUMN "item3" SET DATA TYPE INTEGER,
ALTER COLUMN "item4" SET DATA TYPE INTEGER,
ALTER COLUMN "item5" SET DATA TYPE INTEGER,
ALTER COLUMN "item6" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Summoner" ALTER COLUMN "revisionDate" SET DATA TYPE TEXT;

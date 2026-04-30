/*
  Warnings:

  - Added the required column `gameEndTimestamp` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameType` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "gameEndTimestamp" TEXT NOT NULL,
ADD COLUMN     "gameType" TEXT NOT NULL;

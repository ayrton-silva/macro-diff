/*
  Warnings:

  - Added the required column `platformId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queueId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "platformId" TEXT NOT NULL,
ADD COLUMN     "queueId" INTEGER NOT NULL;

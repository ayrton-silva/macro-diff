/*
  Warnings:

  - Added the required column `teamId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "teamId" TEXT NOT NULL;

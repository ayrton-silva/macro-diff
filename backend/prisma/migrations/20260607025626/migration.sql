/*
  Warnings:

  - Added the required column `jungleMinionsKilled` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantFrames" ADD COLUMN     "jungleMinionsKilled" INTEGER NOT NULL;

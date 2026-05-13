/*
  Warnings:

  - Added the required column `neutralMinionsKilled` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "neutralMinionsKilled" INTEGER NOT NULL;

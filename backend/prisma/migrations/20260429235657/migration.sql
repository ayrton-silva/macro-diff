/*
  Warnings:

  - Added the required column `teamPosition` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `win` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "teamPosition" TEXT NOT NULL,
ADD COLUMN     "win" BOOLEAN NOT NULL;

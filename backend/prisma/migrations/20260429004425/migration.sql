/*
  Warnings:

  - You are about to drop the `ProfileIcon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Summoner" DROP CONSTRAINT "Summoner_profileIconId_fkey";

-- DropTable
DROP TABLE "ProfileIcon";

/*
  Warnings:

  - The primary key for the `Participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Participants` table. All the data in the column will be lost.
  - Added the required column `puuid` to the `Participants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_participantsId_fkey";

-- AlterTable
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_pkey",
DROP COLUMN "id",
ADD COLUMN     "puuid" TEXT NOT NULL,
ADD CONSTRAINT "Participants_pkey" PRIMARY KEY ("puuid");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_participantsId_fkey" FOREIGN KEY ("participantsId") REFERENCES "Participants"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

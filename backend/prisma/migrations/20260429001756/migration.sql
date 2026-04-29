/*
  Warnings:

  - Added the required column `level` to the `Summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileIconId` to the `Summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revisionDate` to the `Summoner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "profileIconId" TEXT NOT NULL,
ADD COLUMN     "revisionDate" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProfileIcon" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ProfileIcon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Summoner" ADD CONSTRAINT "Summoner_profileIconId_fkey" FOREIGN KEY ("profileIconId") REFERENCES "ProfileIcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

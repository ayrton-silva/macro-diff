/*
  Warnings:

  - The primary key for the `ProfileIcon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `ProfileIcon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `profileIconId` on the `Summoner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Summoner" DROP CONSTRAINT "Summoner_profileIconId_fkey";

-- AlterTable
ALTER TABLE "ProfileIcon" DROP CONSTRAINT "ProfileIcon_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "ProfileIcon_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Summoner" DROP COLUMN "profileIconId",
ADD COLUMN     "profileIconId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Summoner" ADD CONSTRAINT "Summoner_profileIconId_fkey" FOREIGN KEY ("profileIconId") REFERENCES "ProfileIcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

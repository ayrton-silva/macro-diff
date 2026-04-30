/*
  Warnings:

  - Added the required column `assists` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deaths` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kills` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksPrimaryStyle` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksPrimaryStyleSelection0` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksPrimaryStyleSelection1` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksPrimaryStyleSelection2` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksPrimaryStyleSelection3` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksStat0` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksStat1` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksStat2` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksSubStyle` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksSubStyleSelection0` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perksSubStyleSelection1` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "assists" INTEGER NOT NULL,
ADD COLUMN     "deaths" INTEGER NOT NULL,
ADD COLUMN     "kills" INTEGER NOT NULL,
ADD COLUMN     "perksPrimaryStyle" INTEGER NOT NULL,
ADD COLUMN     "perksPrimaryStyleSelection0" INTEGER NOT NULL,
ADD COLUMN     "perksPrimaryStyleSelection1" INTEGER NOT NULL,
ADD COLUMN     "perksPrimaryStyleSelection2" INTEGER NOT NULL,
ADD COLUMN     "perksPrimaryStyleSelection3" INTEGER NOT NULL,
ADD COLUMN     "perksStat0" INTEGER NOT NULL,
ADD COLUMN     "perksStat1" INTEGER NOT NULL,
ADD COLUMN     "perksStat2" INTEGER NOT NULL,
ADD COLUMN     "perksSubStyle" INTEGER NOT NULL,
ADD COLUMN     "perksSubStyleSelection0" INTEGER NOT NULL,
ADD COLUMN     "perksSubStyleSelection1" INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `abilityPower` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attackDamage` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentGold` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `health` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthMax` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powerMax` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xp` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantFrames" ADD COLUMN     "abilityPower" INTEGER NOT NULL,
ADD COLUMN     "attackDamage" INTEGER NOT NULL,
ADD COLUMN     "currentGold" INTEGER NOT NULL,
ADD COLUMN     "health" INTEGER NOT NULL,
ADD COLUMN     "healthMax" INTEGER NOT NULL,
ADD COLUMN     "power" INTEGER NOT NULL,
ADD COLUMN     "powerMax" INTEGER NOT NULL,
ADD COLUMN     "xp" INTEGER NOT NULL;

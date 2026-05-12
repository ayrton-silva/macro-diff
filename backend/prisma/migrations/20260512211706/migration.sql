/*
  Warnings:

  - The primary key for the `MatchTimeline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_EventsToMatchTimeline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_MatchTimelineToParticipantFrames` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[matchId]` on the table `MatchTimeline` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `B` on the `_EventsToMatchTimeline` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_MatchTimelineToParticipantFrames` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_EventsToMatchTimeline" DROP CONSTRAINT "_EventsToMatchTimeline_B_fkey";

-- DropForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" DROP CONSTRAINT "_MatchTimelineToParticipantFrames_A_fkey";

-- AlterTable
ALTER TABLE "MatchTimeline" DROP CONSTRAINT "MatchTimeline_pkey",
ADD COLUMN     "matchTimelineId" SERIAL NOT NULL,
ADD CONSTRAINT "MatchTimeline_pkey" PRIMARY KEY ("matchTimelineId");

-- AlterTable
ALTER TABLE "_EventsToMatchTimeline" DROP CONSTRAINT "_EventsToMatchTimeline_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_EventsToMatchTimeline_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_MatchTimelineToParticipantFrames" DROP CONSTRAINT "_MatchTimelineToParticipantFrames_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
ADD CONSTRAINT "_MatchTimelineToParticipantFrames_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "MatchTimeline_matchId_key" ON "MatchTimeline"("matchId");

-- CreateIndex
CREATE INDEX "_EventsToMatchTimeline_B_index" ON "_EventsToMatchTimeline"("B");

-- AddForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" ADD CONSTRAINT "_MatchTimelineToParticipantFrames_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchTimeline"("matchTimelineId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToMatchTimeline" ADD CONSTRAINT "_EventsToMatchTimeline_B_fkey" FOREIGN KEY ("B") REFERENCES "MatchTimeline"("matchTimelineId") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `_EventsToMatchTimeline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchTimelineToParticipantFrames` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matchTimelineMatchTimelineId` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTimelineMatchTimelineId` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventsToMatchTimeline" DROP CONSTRAINT "_EventsToMatchTimeline_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventsToMatchTimeline" DROP CONSTRAINT "_EventsToMatchTimeline_B_fkey";

-- DropForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" DROP CONSTRAINT "_MatchTimelineToParticipantFrames_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" DROP CONSTRAINT "_MatchTimelineToParticipantFrames_B_fkey";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "matchTimelineMatchTimelineId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ParticipantFrames" ADD COLUMN     "matchTimelineMatchTimelineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_EventsToMatchTimeline";

-- DropTable
DROP TABLE "_MatchTimelineToParticipantFrames";

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_matchTimelineMatchTimelineId_fkey" FOREIGN KEY ("matchTimelineMatchTimelineId") REFERENCES "MatchTimeline"("matchTimelineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantFrames" ADD CONSTRAINT "ParticipantFrames_matchTimelineMatchTimelineId_fkey" FOREIGN KEY ("matchTimelineMatchTimelineId") REFERENCES "MatchTimeline"("matchTimelineId") ON DELETE RESTRICT ON UPDATE CASCADE;

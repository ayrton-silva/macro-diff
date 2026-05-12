/*
  Warnings:

  - You are about to drop the column `matchTimelineMatchTimelineId` on the `Events` table. All the data in the column will be lost.
  - The primary key for the `MatchTimeline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `matchTimelineMatchTimelineId` on the `ParticipantFrames` table. All the data in the column will be lost.
  - Added the required column `matchTimelineId` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTimelineId` to the `ParticipantFrames` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_matchTimelineMatchTimelineId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantFrames" DROP CONSTRAINT "ParticipantFrames_matchTimelineMatchTimelineId_fkey";

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "matchTimelineMatchTimelineId",
ADD COLUMN     "matchTimelineId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MatchTimeline" DROP CONSTRAINT "MatchTimeline_pkey",
ALTER COLUMN "matchTimelineId" DROP DEFAULT,
ALTER COLUMN "matchTimelineId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MatchTimeline_pkey" PRIMARY KEY ("matchTimelineId");
DROP SEQUENCE "MatchTimeline_matchTimelineId_seq";

-- AlterTable
ALTER TABLE "ParticipantFrames" DROP COLUMN "matchTimelineMatchTimelineId",
ADD COLUMN     "matchTimelineId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_matchTimelineId_fkey" FOREIGN KEY ("matchTimelineId") REFERENCES "MatchTimeline"("matchTimelineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantFrames" ADD CONSTRAINT "ParticipantFrames_matchTimelineId_fkey" FOREIGN KEY ("matchTimelineId") REFERENCES "MatchTimeline"("matchTimelineId") ON DELETE RESTRICT ON UPDATE CASCADE;

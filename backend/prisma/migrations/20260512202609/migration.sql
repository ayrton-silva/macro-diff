/*
  Warnings:

  - The primary key for the `ParticipantFrames` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" DROP CONSTRAINT "_MatchTimelineToParticipantFrames_B_fkey";

-- AlterTable
ALTER TABLE "ParticipantFrames" DROP CONSTRAINT "ParticipantFrames_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "participantFrameId" DROP DEFAULT,
ADD CONSTRAINT "ParticipantFrames_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParticipantFrames_participantFrameId_seq";

-- AddForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" ADD CONSTRAINT "_MatchTimelineToParticipantFrames_B_fkey" FOREIGN KEY ("B") REFERENCES "ParticipantFrames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

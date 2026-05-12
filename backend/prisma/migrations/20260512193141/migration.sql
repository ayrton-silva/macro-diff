-- CreateTable
CREATE TABLE "MatchTimeline" (
    "matchId" TEXT NOT NULL,

    CONSTRAINT "MatchTimeline_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "Events" (
    "eventId" SERIAL NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "creatorId" INTEGER,
    "wardType" TEXT,
    "itemId" INTEGER,
    "participantPuuid" INTEGER,
    "teamId" INTEGER,
    "victimId" INTEGER,
    "killerId" INTEGER,
    "killType" TEXT,
    "positionx" INTEGER,
    "positiony" INTEGER,
    "monsterSubType" TEXT,
    "monsterType" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "ParticipantFrames" (
    "participantFrameId" SERIAL NOT NULL,
    "participantPuuid" INTEGER NOT NULL,
    "timestamp" TEXT NOT NULL,
    "positionx" INTEGER NOT NULL,
    "positiony" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "minionsKilled" INTEGER NOT NULL,
    "totalGold" INTEGER NOT NULL,
    "totalDamageDoneToChampions" INTEGER NOT NULL,

    CONSTRAINT "ParticipantFrames_pkey" PRIMARY KEY ("participantFrameId")
);

-- CreateTable
CREATE TABLE "_MatchTimelineToParticipantFrames" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MatchTimelineToParticipantFrames_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventsToMatchTimeline" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventsToMatchTimeline_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MatchTimelineToParticipantFrames_B_index" ON "_MatchTimelineToParticipantFrames"("B");

-- CreateIndex
CREATE INDEX "_EventsToMatchTimeline_B_index" ON "_EventsToMatchTimeline"("B");

-- AddForeignKey
ALTER TABLE "MatchTimeline" ADD CONSTRAINT "MatchTimeline_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" ADD CONSTRAINT "_MatchTimelineToParticipantFrames_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchTimeline"("matchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchTimelineToParticipantFrames" ADD CONSTRAINT "_MatchTimelineToParticipantFrames_B_fkey" FOREIGN KEY ("B") REFERENCES "ParticipantFrames"("participantFrameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToMatchTimeline" ADD CONSTRAINT "_EventsToMatchTimeline_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToMatchTimeline" ADD CONSTRAINT "_EventsToMatchTimeline_B_fkey" FOREIGN KEY ("B") REFERENCES "MatchTimeline"("matchId") ON DELETE CASCADE ON UPDATE CASCADE;

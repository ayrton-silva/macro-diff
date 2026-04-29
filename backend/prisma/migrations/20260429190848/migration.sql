-- CreateTable
CREATE TABLE "Match" (
    "matchId" TEXT NOT NULL,
    "gameDuration" BIGINT NOT NULL,
    "gameMode" TEXT NOT NULL,
    "participantsId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL,
    "championName" TEXT NOT NULL,
    "lane" TEXT NOT NULL,
    "summoner1Id" BIGINT NOT NULL,
    "summoner2Id" BIGINT NOT NULL,
    "totalMinionsKilled" BIGINT NOT NULL,
    "totalDamageDealtToChampions" BIGINT NOT NULL,
    "wardsPlaced" BIGINT NOT NULL,
    "goldEarned" BIGINT NOT NULL,
    "item0" BIGINT NOT NULL,
    "item1" BIGINT NOT NULL,
    "item2" BIGINT NOT NULL,
    "item3" BIGINT NOT NULL,
    "item4" BIGINT NOT NULL,
    "item5" BIGINT NOT NULL,
    "item6" BIGINT NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_participantsId_fkey" FOREIGN KEY ("participantsId") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

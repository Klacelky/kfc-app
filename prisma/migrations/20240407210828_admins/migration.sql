-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_gameId_fkey";

-- DropForeignKey
ALTER TABLE "MatchGame" DROP CONSTRAINT "MatchGame_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchTeam" DROP CONSTRAINT "MatchTeam_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchTeam" DROP CONSTRAINT "MatchTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerPosition" DROP CONSTRAINT "PlayerPosition_playerPositionsId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerPositions" DROP CONSTRAINT "PlayerPositions_gameId_fkey";

-- DropForeignKey
ALTER TABLE "TeamSource" DROP CONSTRAINT "TeamSource_matchId_fkey";

-- DropForeignKey
ALTER TABLE "TeamSource" DROP CONSTRAINT "TeamSource_sourceGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TeamSource" DROP CONSTRAINT "TeamSource_sourceMatchId_fkey";

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "su" BOOLEAN NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- AddForeignKey
ALTER TABLE "TeamSource" ADD CONSTRAINT "TeamSource_sourceGroupId_fkey" FOREIGN KEY ("sourceGroupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSource" ADD CONSTRAINT "TeamSource_sourceMatchId_fkey" FOREIGN KEY ("sourceMatchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSource" ADD CONSTRAINT "TeamSource_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeam" ADD CONSTRAINT "MatchTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeam" ADD CONSTRAINT "MatchTeam_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchGame" ADD CONSTRAINT "MatchGame_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "MatchGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPositions" ADD CONSTRAINT "PlayerPositions_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "MatchGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPosition" ADD CONSTRAINT "PlayerPosition_playerPositionsId_fkey" FOREIGN KEY ("playerPositionsId") REFERENCES "PlayerPositions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

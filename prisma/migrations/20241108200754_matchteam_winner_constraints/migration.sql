/*
  Warnings:

  - A unique constraint covering the columns `[matchId,winner]` on the table `MatchTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MatchTeam_matchId_winner_key" ON "MatchTeam"("matchId", "winner");

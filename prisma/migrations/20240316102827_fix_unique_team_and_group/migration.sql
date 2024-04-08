/*
  Warnings:

  - A unique constraint covering the columns `[slug,tournamentId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[abbrev,tournamentId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Team_abbrev_key";

-- CreateIndex
CREATE UNIQUE INDEX "Group_slug_tournamentId_key" ON "Group"("slug", "tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_abbrev_tournamentId_key" ON "Team"("abbrev", "tournamentId");

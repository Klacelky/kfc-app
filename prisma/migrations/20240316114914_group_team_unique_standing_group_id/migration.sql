/*
  Warnings:

  - A unique constraint covering the columns `[groupId,standing]` on the table `GroupTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupTeam_groupId_standing_key" ON "GroupTeam"("groupId", "standing");

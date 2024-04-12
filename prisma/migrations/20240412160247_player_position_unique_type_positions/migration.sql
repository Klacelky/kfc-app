/*
  Warnings:

  - A unique constraint covering the columns `[playerPositionsId,type]` on the table `PlayerPosition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayerPosition_playerPositionsId_type_key" ON "PlayerPosition"("playerPositionsId", "type");

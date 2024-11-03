/*
  Warnings:

  - Made the column `teamId` on table `Goal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "playerId" DROP NOT NULL,
ALTER COLUMN "teamId" SET NOT NULL;

/*
  Warnings:

  - Added the required column `statsPublished` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatsPublished" AS ENUM ('NOW', 'AFTER', 'NEVER');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "statsPublished" "StatsPublished" NOT NULL;

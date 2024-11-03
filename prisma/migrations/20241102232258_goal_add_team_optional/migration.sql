-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "teamId" TEXT;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PopulateRows
UPDATE "Goal"
SET "teamId" = "subquery"."teamId"
FROM (
    SELECT DISTINCT "_PlayerToTeam"."A" AS "playerId", "_PlayerToTeam"."B" AS "teamId", "Goal"."id" AS "goalId"
    FROM "_PlayerToTeam"
	INNER JOIN "MatchTeam" ON "_PlayerToTeam"."B" = "MatchTeam"."teamId"
	INNER JOIN "MatchGame" ON "MatchGame"."matchId" = "MatchTeam"."matchId"
	INNER JOIN "Goal" ON "Goal"."gameId" = "MatchGame"."id"
) AS subquery
WHERE "Goal"."playerId" = "subquery"."playerId" AND "Goal"."id" = "subquery"."goalId";

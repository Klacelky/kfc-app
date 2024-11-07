ALTER TABLE "TeamSource"
    ADD CONSTRAINT "teamsource_either_group_or_match" CHECK (
        ("sourceGroupId" IS NOT NULL AND "standing" IS NOT NULL AND "sourceMatchId" IS NULL AND "winner" IS NULL) OR
        ("sourceGroupId" IS NULL AND "standing" IS NULL AND "sourceMatchId" IS NOT NULL AND "winner" IS NOT NULL)
    )

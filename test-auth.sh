for ROUTE in \
        '/api'                                                                                                     \
        '/api/admins'                                                                                              \
        '/api/admins/[adminId]'                                                                                    \
        '/api/auth'                                                                                                \
        '/api/players'                                                                                             \
        '/api/players/[playerId]'                                                                                  \
        '/api/tournaments'                                                                                         \
        '/api/tournaments/[tournamentIdOrSlug]'                                                                    \
        '/api/tournaments/[tournamentIdOrSlug]/groups'                                                             \
        '/api/tournaments/[tournamentIdOrSlug]/groups/[groupIdOrSlug]'                                             \
        '/api/tournaments/[tournamentIdOrSlug]/groups/[groupIdOrSlug]/results'                                     \
        '/api/tournaments/[tournamentIdOrSlug]/groups/[groupIdOrSlug]/teams'                                       \
        '/api/tournaments/[tournamentIdOrSlug]/groups/[groupIdOrSlug]/teams/[teamId]'                              \
        '/api/tournaments/[tournamentIdOrSlug]/match'                                                              \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]'                                                    \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]/game'                                               \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]/game/[gameId]'                                      \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]/game/[gameId]/goal'                                 \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]/game/[gameId]/goal/[goalId]'                        \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]/game/[gameId]/playerPositions'                      \
        '/api/tournaments/[tournamentIdOrSlug]/match/[matchId]/game/[gameId]/playerPositions/[playerPositionsId]'  \
        '/api/tournaments/[tournamentIdOrSlug]/teams'                                                              \
        '/api/tournaments/[tournamentIdOrSlug]/teams/[teamIdOrAbbrev]'
do
    while true; do
        echo "'localhost:3000$ROUTE'"
        for METHOD in GET POST PUT PATCH DELETE; do
            echo $METHOD
            http --headers $METHOD localhost:3000$ROUTE "$@"
        done
        read -r READ
        if [ -z "$READ" ]; then
            break
        fi
    done
done

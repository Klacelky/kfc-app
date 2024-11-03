import prisma from '@/utils/server/db';

async function main() {
    const goals = await prisma.goal.findMany({
        include: { player: { include: { teams: true } }, game: { include: { match: true } } },
    });
    goals.forEach((goal, idx) => {
        console.log(`Checking\t${idx}/${goals.length}`);
        if (goal.player && goal.player.teams.length !== 1) {
            console.log(`Player ${goal.player.name}(${goal.player.id}) has multiple teams`);
        }
        if (
            goal.player &&
            goal.player.teams.find(
                ({ id, tournamentId }) => id === goal.teamId && tournamentId === goal.game.match.tournamentId,
            ) === undefined
        ) {
            throw Error(`Team for goal ${goal.id} set wrong`);
        }
    });
}

main()
    .then(() => console.log('Migration check successfull'))
    .catch(console.error);

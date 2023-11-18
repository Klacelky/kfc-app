import { useEffect, useState } from 'react';
import { z } from 'zod';

const liveGameDataSchema = z.object({
    home_team: z.string(),
    visiting_team: z.string(),
    home_score: z.number(),
    visiting_score: z.number(),
});

export type LiveGameData = z.infer<typeof liveGameDataSchema>;

export default function useLive() {
    const [gameData, setGameData] = useState<LiveGameData | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_KFC_LIVE_SCORE || 'https://kfc-live.jirik.dev/score');
            return liveGameDataSchema.parse(await res.json());
        })()
            .then((data) => setGameData(data))
            .catch(() => setGameData(null));
    }, [setGameData]);

    return { gameData };
}

export function useLiveWS() {
    const [gameData, setGameData] = useState<LiveGameData | null>(null);

    useEffect(() => {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_KFC_LIVE_WS || 'wss://kfc-live.jirik.dev/live');
        ws.addEventListener('error', (error) => {
            console.log(error);
            setGameData(null);
        });
        ws.addEventListener('message', (event) => {
            console.log(event);
            setGameData(JSON.parse(event.data));
        });
        ws.addEventListener('close', () => {
            console.log('Closed');
            setGameData(null);
        });

        return () => {
            ws.close();
        };
    }, [setGameData]);

    return { gameData };
}

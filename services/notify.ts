import axios from 'axios';

import { ScoreData } from '@/dtos/match';

const KFC_LIVE_URL = process.env.KFC_LIVE_URL;
const KFC_LIVE_USER = process.env.KFC_LIVE_USER;
const KFC_LIVE_PASS = process.env.KFC_LIVE_PASS;

export async function notifyScore(data: ScoreData): Promise<any> {
    if (!KFC_LIVE_URL || !KFC_LIVE_USER || !KFC_LIVE_PASS) {
        console.warn("KFCLIVE No url or creds");
        return { error: 'No url or creds' };
    }
    try {
        await axios.post(`${KFC_LIVE_URL}/score`, data, { auth: { username: KFC_LIVE_USER, password: KFC_LIVE_PASS } });
        return undefined;
    } catch (error) {
        console.error("KFCLIVE", error);
        return error;
    }
}

export async function nofityHideScore(): Promise<any> {
    if (!KFC_LIVE_URL || !KFC_LIVE_USER || !KFC_LIVE_PASS) {
        console.warn("KFCLIVE No url or creds");
        return { error: 'No url or creds' };
    }
    try {
        await axios.delete(`${KFC_LIVE_URL}/score`, { auth: { username: KFC_LIVE_USER, password: KFC_LIVE_PASS } });
        return undefined;
    } catch (error) {
        console.warn("KFCLIVE", error)
        return error;
    }
}

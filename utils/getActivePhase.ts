import { cache } from 'react';
import 'server-only';
import { Phase } from '@/data/types/Contract';
import { getInjectiveUrl } from './getInjectiveUrl';

export const getActivePhase = cache(async (contractAddress: string) => {
    const res = await fetch(getInjectiveUrl(`cosmwasm/wasm/v1/contract/${contractAddress}/smart/eyJnZXRfbWV0YWRhdGEiOnt9fQ==`));
    const phase = await res.json() as Phase;
    return phase;
})
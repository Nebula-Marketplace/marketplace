import { cache } from 'react';
import 'server-only';
import { Phase } from '@/data/types/Contract';

export const getActivePhase = cache(async (contractAddress: string) => {
    let phase : Phase;
    const res = await fetch(`https://testnet.lcd.injective.network/cosmwasm/wasm/v1/contract/${contractAddress}/smart/eyJnZXRfcGhhc2UiOnt9fQ==`);
    const data = await res.json() as Phase;
    return data;
})
import { cache } from 'react';
import 'server-only';
import { CollectionContract, Phase } from '@/data/types/Contract';
import { getInjectiveUrl } from './getInjectiveUrl';

export const getCollectionContract = cache(async (contractAddress: string) => {
    const res = await fetch(getInjectiveUrl(`cosmwasm/wasm/v1/contract/${contractAddress}/smart/eyJnZXRfbWV0YWRhdGEiOnt9fQ==`));
    const collection = await res.json() as CollectionContract;
    return collection;
})
import { cache } from 'react';
import 'server-only';
import { collections } from '@/data/mock/collections'; 
import { Collection } from '@/data/types/Collection';

export const getCollection = cache(async (contractAddress: string) => {
    const collection : Collection = collections.filter(c => c.contract === contractAddress)[0];
    return collection;
})
import { Metadata } from "next";
import Mint  from '@/app/components/block/Mint';
import Breadcrumb from "@/app/components/breadcrumb";
import MintModal from "@/app/components/modal/MintModal";
import { getCollection } from "@/utils/getCollection";
import { getActivePhase } from "@/data/external/injective-api";
import { Collection } from "@/data/types/Collection";
import { getContractFromExchange, fetchNft,fetchNftContractState,getMeta} from "@/utils/exchangeApi";
import { getCollectionContract } from "@/utils/getCollectionContract";
export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Launchpad",
};

const item = {
    title: "Mint",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Launchpad",
            path: "/collections/explore",
        },
        {
            name: "Mint",
        }
    ],
};


export default async function Page({
    params: { contract_address }
}: {
        params: {contract_address:string}
    }) {
    const collection = await getCollectionContract(contract_address);
    const active = await getActivePhase(contract_address);
    let obj = {
        collection:collection,
        activePhase:active
    }    
    return (
        <>
        <Breadcrumb data={item} />
        <Mint data={obj}/>
        <MintModal data={obj}/>
        </>
    );
}

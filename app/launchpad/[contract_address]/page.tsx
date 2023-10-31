import { Metadata } from "next";
import Mint  from '@/app/components/block/Mint';
import Breadcrumb from "@/app/components/breadcrumb";
import MintModal from "@/app/components/modal/MintModal";
import {activePhase} from "@/data/mock/active-phase";
import {Collection} from "@/data/types/Collection";

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

const active = {
    contractAddress:"12312",
    collectionName:"A5TOUND",
    activePhase: {
        current:0,
        name:"OG Mint",
        allocation: 3,
        price: 0.8,
        starts: 1697860894,
        ends:1697860894,
        allowed: []
    }    
}

const collection: Collection = {
    Name:"A5tound",
        ContractAddress: "inj123",
        Symbol:"A5T",
        Supply:200,
        Metadata: {
            Banner:"/assets/images/collections/a5tound/banner.jpeg",
            Cover: "/assets/images/collections/a5tound/cover.jpeg",
            Description:"For the community. Ran by the community. Brand , Inspired by Fashion , Music , and the 90s",
            Logo: "",
            Discord:"",
            Twitter:"",
            Telegram:"",
            Email:"",
            Website:"",
            Atlas3: ""
    }
}


export default async function Page() {

    return (
        <>
        <Breadcrumb data={item} />
        <Mint data={collection}/>
        <MintModal data={active}/>
        </>
    );
}

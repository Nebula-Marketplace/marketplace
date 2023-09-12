import CreateSellNft from "@/app/components/block/CreateSellNft";
import LiveAuction5 from "@/app/components/block/LiveAuction5";
import PopularCollection from "@/app/components/block/PopularCollection";
import TodaysPicks4 from "@/app/components/block/TodaysPicks4";
import TopSeller2 from "@/app/components/block/TopSeller2";
import Hero4 from "@/app/components/hero/Hero4";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { getFetchUrl } from "@/lib/getFetchUrl";
import { Metadata } from "next";
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Home",
};

export default async function Page() {

    return (
        <>
            <Hero4 />
            <LiveAuction5 />
            <TopSeller2 />
            <TodaysPicks4 />
            <PopularCollection />
            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}

import MainHero from "@/app/components/hero/MainHero";
import TodaysPicks from "@/app/components/block/TodaysPicks";
import CreateSellNft from "@/app/components/block/CreateSetllNfts";
import { Metadata } from "next";
import UpcomingLaunches from "@/app/components/block/UpcomingLaunches";

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Home",
};

export default async function Page() {
    return (
        <>
            <MainHero />
            <CreateSellNft />
        </>
    );
}

import MainHero from "@/app/components/hero/MainHero";
import TodaysPicks from "@/app/components/block/TodaysPicks";
import UnclaimedCollections from "@/app/components/block/UnclaimedCollections";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Home",
};

export default async function Page() {

    return (
        <>
            <MainHero />
            <TodaysPicks />
            <UnclaimedCollections />
        </>
    );
}

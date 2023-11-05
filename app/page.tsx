import CreateSellNft from "@/app/components/block/CreateSetllNfts";
import { Metadata } from "next";
import Hero from "./components/hero/Hero";
import UpcomingLaunches from "./components/block/UpcomingLaunches";

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Home",
};

export default async function Page() {
    return (
        <>
            <Hero />
            <CreateSellNft />
            <UpcomingLaunches />
        </>
    );
}

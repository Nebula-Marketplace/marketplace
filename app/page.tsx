import Hero3 from "@/app/components/hero/Hero3";
import Ranking from "@/app/components/block/UnclaimedCollections";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Home",
};

export default async function Page() {

    return (
        <>
            <Hero3 />
            <Ranking />
        </>
    );
}

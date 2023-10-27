import { Metadata } from "next";
import Mint  from '@/app/components/block/Mint';
import Breadcrumb from "@/app/components/breadcrumb";

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

export default async function Page() {

    return (
        <>
        <Breadcrumb data={item} />
        <Mint/>
        </>
    );
}

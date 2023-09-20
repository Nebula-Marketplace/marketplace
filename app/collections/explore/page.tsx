import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";
import Explorer from "@/app/components/block/Explorer";

const item = {
    title: "Explore",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Collections",
            path: "/collections/explore",
        },
        {
            name: "Explore",
        }
    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Explore",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Explorer />
        </>
    );
}

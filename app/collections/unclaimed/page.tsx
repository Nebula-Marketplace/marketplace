import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";
import UnclaimedCollections from "@/app/components/block/UnclaimedCollections";

const item = {
    title: "Community",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Collections",
            path: "/collections"
        },
        {
            name: "Unclaimed Collections"

        }
    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Community",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <UnclaimedCollections />
        </>
    );
}

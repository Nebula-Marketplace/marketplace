import { Metadata } from "next";
import Breadcrumb from "@/app/components/breadcrumb";
import CreateCollection from "@/app/components/block/CreateCollection";
import ClaimCollectionWarningModal from "@/app/components/modal/ClaimCollectionWarningModal";

const item = {
    title: "Claim Collection",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Create Token"
        }
    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Create Token",
};

export default async function Page() {

    return (
        <>
        <Breadcrumb data={item} />
        {/* <ClaimCollectionWarningModal /> */}
        <CreateCollection />
        </>
    );
}

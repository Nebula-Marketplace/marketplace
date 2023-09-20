import { Metadata } from "next";
import Breadcrumb from "@/app/components/breadcrumb";
import UpdateMetadata from "@/app/components/block/UpdateMetadata";
import ClaimCollectionWarningModal from "@/app/components/modal/ClaimCollectionWarningModal";

const item = {
    title: "Claim Collection",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Claim Collection"
        }
    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Claim Collection",
};

export default async function Page() {

    return (
        <>
        <Breadcrumb data={item} />
        <ClaimCollectionWarningModal />
        <UpdateMetadata />
        </>
    );
}

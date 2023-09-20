import AuthorProfile from "@/app/components/block/CollectionDetails";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";

const item = {
    title: "Collection Details",
    breadcrumb: [
        {
            name: "Col",
            path: "/",
        },
        {
            name: "Collections",
        },
        {
            name: "Details",
        },
    ],
};

export default function page(): JSX.Element {
    return (
        <>
            <AuthorProfile />

        </>
    );
}

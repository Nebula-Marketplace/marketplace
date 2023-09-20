import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Community",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Community",
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
        </>
    );
}

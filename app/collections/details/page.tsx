import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Explore",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Explore",
            path: "/explore",
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
        </>
    );
}

import Contact from "@/app/components/block/Contact";
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Contact",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Community",
            path: "/community"
        },
        {
            name: "Contact",
        }

    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Contact",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Contact />
        </>
    );
}

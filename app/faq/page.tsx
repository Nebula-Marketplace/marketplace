import { Metadata } from "next";
import Breadcrumb from "../components/breadcrumb";
import Faq from "../components/block/Faq";

const item = {
    title: "FAQ",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "FAQ"
        }
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | FAQ",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Faq />
        </>
    );
}

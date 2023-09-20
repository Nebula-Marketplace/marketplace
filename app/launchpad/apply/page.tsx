import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";

const item = {
    title: "Launchpad Application",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Launchpad",
            path: "/launchpad",
        },
        {
            name: "Apply",
        }
    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Launchpad | Appy",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
        </>
    );
}

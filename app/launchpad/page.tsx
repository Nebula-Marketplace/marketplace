import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";
import UpcomingLaunches from "@/app/components/block/UpcomingLaunches";

const item = {
    title: "Upcoming Launches",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Launchpad",
        }
    ],
};

export const metadata: Metadata = {
    title: "Nebula | NFT Marketplace | Launchpad",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <UpcomingLaunches />
        </>
    );
}

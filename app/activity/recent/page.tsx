import Breadcrumb from "@/app/components/breadcrumb";
import RecentActivity from "@/app/components/block/RecentActivity";

const item = {
    title: "Activity",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Activity",
        },
        {
            name: "Recent",
        },
    ],
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <RecentActivity />
        </>
    );
}

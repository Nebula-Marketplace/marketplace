import { Launches } from "@/data/mock/launches";
import LaunchCard from "../card/LaunchCard";
import SearchBox from "../element/SearchBox";
import Link from "next/link";

export default function UpcomingLaunches(): JSX.Element {
    return (
        <>
            <section className="tf-activity s1 tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            {Launches.map((item) => (
                                <LaunchCard key={item.id} data={item} />
                            ))}

                        </div>
                       
                    </div>
                </div>
            </section>
        </>
    );
}

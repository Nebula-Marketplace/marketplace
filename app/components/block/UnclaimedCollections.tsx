import CollectionListCard from "../card/CollectionListCard";
import Link from "next/link";
import {getUnclaimedCollections} from "@/data/external/injective-api";

{/* @ts-expect-error Async Server Component */}
export default async function UnclaimedCollections(): JSX.Element {
    const data = await getUnclaimedCollections();

    return (
        <>
            <section className="tf-section tf-rank">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-md-12 mb-24">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title text-left">
                                    Unclaimed Collections
                                </h2>
                                <Link href="/collections/explore" className="exp">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="table-ranking">
                                <div className="flex th-title">
                                    <div className="column1">
                                        <h3>Collection</h3>
                                    </div>
                                    <div className="column">
                                        <h3>Owners</h3>
                                    </div>
                                    <div className="column">
                                        <h3>Assets</h3>
                                    </div>
                                </div>
                                {data.map((item) => (
                                    <CollectionListCard
                                        key={item.ContractAddress}
                                        data={{title:item.Name}}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

import { product1 } from "@/data/product";
import Explore4Slidebar from "../sidebar/Explore4Slidebar";
import ProductCard from "../card/ProductCard";
import Link from "next/link";
import CollectionCard from "../card/CollectionCard";
import { useGlobalState } from "@/utils/GlobalContext";
import { useEffect, useState } from "react";
import { fetchNftContractState } from "@/utils/exchangeApi";

export default function Explore4({exchanges,listedNfts}:any) {
    console.log(exchanges)
    const { listed, setListed, collections, setCollections } = useGlobalState();
    const [ filtered, setFiltered ] = useState<string[]>([]);
    console.log(collections)

    useEffect(() => {
        const checkFlags = async () => {
            const promises = exchanges.map(async (address: string) => {
                const state = await fetchNftContractState(address);
                return { address, flagged: state.flagged };
            });

            const results = await Promise.all(promises);
            const flaggedAddresses = results.filter(item => !item.flagged).map(item => item.address);
            setFiltered(flaggedAddresses);
        };

        checkFlags();
    }, [exchanges]);

    return (
        <>
            <section className="tf-explore tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        {/* <div className="col-xl-3 col-lg-3 col-md-12">
                            <Explore4Slidebar />
                        </div> */}
                        <div className="col-xl-9 col-lg-9 col-md-12">
                            <div className="box-epxlore">
                                {filtered.map((item: string, index: any) => {
                                console.log(item)
                                return(
                                    <div
                                        key={index}
                                        className="col-xl-4 col-lg-4 col-md-6 col-sm-6 justify-content-around"
                                    >
                                        <CollectionCard data={item} />
                                    </div>
                                )})}
                            </div>
                            <div className="btn-auction center">
                                {/* <Link
                                    href="/live-auctions"
                                    className="sc-button loadmore fl-button pri-3"
                                >
                                    <span>Load More</span>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

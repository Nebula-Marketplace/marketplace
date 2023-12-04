import { product1 } from "@/data/product";
import Explore4Slidebar from "../sidebar/Explore4Slidebar";
import ProductCard from "../card/ProductCard";
import Link from "next/link";
import CollectionCard from "../card/CollectionCard";
import { useGlobalState } from "@/utils/GlobalContext";

export default function Explore4({exchanges,listedNfts}:any) {
    console.log(exchanges)
    const { listed, setListed, collections, setCollections } = useGlobalState();
    console.log(collections)
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
                                {collections.map((item) => {
                                console.log(item)
                                return(
                                    <div
                                        key={item.id}
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

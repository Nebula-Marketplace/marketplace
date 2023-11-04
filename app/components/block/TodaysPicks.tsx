'use client'
import { product1 } from "@/data/product";
import ProductCard from "../card/ProductCard";
import CollectionCard from "../card/CollectionCard"
import Link from "next/link";
import FilterSection from "../element/FilterSection";
import { useGlobalState } from "@/utils/GlobalContext";

export default function TodaysPicks(): JSX.Element {
    const { listed, setListed, collections, setCollections } = useGlobalState();
    return (
        <>
            <section className="tf-section today-picks">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12 mb-24">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title text-left">
                                    Today's Picks
                                </h2>
                                <Link href="/collections/explore" className="exp">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                       {collections.slice(0, 15).map((item) => {
                            console.log(item)
                            return(
                        
                            <div
                                key={item.id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <CollectionCard data={item} />
                            </div>
                        )})}
                        {/* {listed.slice(0, 15).map((item) => {
                            console.log(item)
                            return(
                        
                            <div
                                key={item.id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <ProductCard data={item} />
                            </div>
                        )})} */}

                    </div>
                </div>
            </section>
        </>
    );
}

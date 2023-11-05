import { product1 } from "@/data/product";
import Explore4Slidebar from "../sidebar/Explore4Slidebar";
import ProductCard from "../card/ProductCard";
import Link from "next/link";

export default function RecentActivity() {
    return (
        <>
            <section className="tf-explore tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-12">
                            <Explore4Slidebar />
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12">
                            <div className="box-epxlore">
                                {/* {product1.slice(0, 6).map((item) => (
                                    <ProductCard key={item.id}/>
                                ))} */}
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

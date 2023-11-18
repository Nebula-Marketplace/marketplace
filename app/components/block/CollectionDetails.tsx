"use client";
import { product1 } from "@/data/product";
import { useEffect, useState } from "react";
import ProductCard6 from "../card/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getContractFromExchange, fetchNft,fetchNftContractState,getMeta} from "@/utils/exchangeApi";

const tabs = ["ALL", "LISTED"];

export default function CollectionDetails(): JSX.Element {
    const [getCurrentTab, setCurrentTab] = useState<string>("all");
    const [collectionData, setcollectionData] = useState<any>();
    const [listed, setListed] = useState<any>();
    const pathname = usePathname();
    // tab handler
    const tabHandler = (select: string) => {
        setCurrentTab(select);
    };
    useEffect(()=>{
        const getData = async()=>{
        console.log(pathname.replace("/collections/",""))
        fetchNftContractState(pathname.replace("/collections/","")).then(async(dataRes)=>{
            let obj = dataRes
            obj.exchange = pathname.replace("/collections/","")
            console.log(obj)
            setcollectionData(obj)
    
            const getData:any[] = []
            await Promise.all(obj.listed.reverse().map(async(dataRes:any) => {
                const getNftMetaData: any= await fetchNft(obj.contract,dataRes.id)
                getMeta(getNftMetaData?.token_uri as string).then(dataGetRes=>{
                    console.log()
                    let exists = getData.some(item => item.id === dataRes?.id && item.collection === obj.contract);
                    if(!exists){
                        getData.push({
                            id: dataRes?.id,
                            collection:obj.contract,
                            exchange:obj.exchange,
                            hert: 10,
                            status: "",
                            img: dataGetRes?.media || dataGetRes?.Media,
                            auction: 1,
                            title: dataGetRes?.Item,
                            tag: dataGetRes?.string,
                            eth: dataRes?.price,
                            author: { status: "string", name: "string", avatar: "string" },
                            history: true,
                            price:dataRes?.price,
                            type:"listed"
                        })
                    }
                })
            })).then(() => {
                console.log(getData)
                setListed(getData)
            });
        })
    }
    getData()
        // fetchNftContractState()
    },[])

    return (
        <>
            <section className="tf-section authors">
                <div className="ibthemes-container">
                    <div className="flat-tabs tab-authors mg-t50">
                        <div className="author-profile flex">
                            <div className="feature-profile">
                                <img
                                    height={500}
                                    width={500}
                                    style={{ height: "276px", width: "276px" }}
                                    src={collectionData?.logo_uri?collectionData?.logo_uri:"/assets/images/avatar/avt-author-tab.jpg"}
                                    alt="Image"
                                    className="avatar"
                                />
                            </div>
                            <div className="infor-profile">
                                <span>Collection Details</span>
                                <h2 className="title">{collectionData?.collection}</h2>
                                <p className="content">
                                {collectionData?.description}
                                </p>
                                <form>
                                    <input
                                        type="text"
                                        className="inputcopy"
                                        defaultValue="DdzFFzCqrhshMSxABCdfrge"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="btn-copycode"
                                    >
                                        <i className="icon-fl-file-1" />
                                    </button>
                                </form>
                            </div>
                            <div className="widget-social style-3">
                                <ul>
                                    <li>
                                        <a>
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li className="style-2">
                                        <a>
                                            <i className="fab fa-telegram-plane" />
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <i className="fab fa-youtube" />
                                        </a>
                                    </li>
                                    <li className="mgr-none">
                                        <a>
                                            <i className="icon-fl-tik-tok-2" />
                                        </a>
                                    </li>
                                </ul>
                                <div className="btn-profile">
                                    <Link
                                        href="/login"
                                        className="sc-button style-1 follow"
                                    >
                                        Follow
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <ul className="menu-tab flex">
                            {tabs.map((tab, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        tabHandler(tab.toLocaleLowerCase())
                                    }
                                    className={`tablinks ${
                                        tab
                                            .toLocaleLowerCase()
                                            .includes(getCurrentTab)
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                        <div className="content-tab active">
                            <div className="row">
                                {/* {listed
                                    .filter((item) =>
                                        getCurrentTab === "all"
                                            ? item
                                            : item.type === getCurrentTab
                                    )
                                    .slice(0, 8)
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="col-xl-3 col-lg-4 col-md-6 col-12"
                                        >
                                            <ProductCard6 data={item} />
                                        </div>
                                    ))} */}
                                      {listed?.length>0&&listed?.slice(0, 15).map((item:any) => {
                            console.log(item)
                            return(
                        
                            <div
                                key={item.id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <ProductCard6 data={item} />
                            </div>
                        )})}
                            </div>
                        </div>
                        <div className="col-md-12 wrap-inner load-more text-center">
                            {/* <Link
                                href="/authors-2"
                                className="sc-button loadmore fl-button pri-3"
                            >
                                <span>Load More</span>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

"use client";
import { product1 } from "@/data/product";
import { useEffect, useState, use } from "react";
import ProductCard6 from "../card/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getContractFromExchange, fetchNft,fetchNftContractState,getMeta, fetchAll} from "@/utils/exchangeApi";
import { Collection } from "@/data/types/Collection";

const tabs = ["ALL", "LISTED"];

interface Token {
    id: string,
    collection: string,
    exchange: string,
    status: string,
    img: string,
    auction: number,
    title: string,
    tag: string,
    eth: string,
    author: { status: string, name: string, avatar: string },
    history: boolean,
    price: string,
    type:string 
}

function removeDuplicatesById(items: Token[]): Token[] {
    const seenIds: Set<string> = new Set();
    const duplicateIds: Set<string> = new Set();
    
    return items.filter(item => {
        if (seenIds.has(item.id)) {
            // Duplicate id, filter it out and mark as duplicate
            duplicateIds.add(item.id);
            return false;
        } else {
            // Not a duplicate, add it to the set and include it in the result
            seenIds.add(item.id);
            return true;
        }
    }).filter(item => !duplicateIds.has(item.id));
}


export default function CollectionDetails(): JSX.Element {
    const [getCurrentTab, setCurrentTab] = useState<string>("all");
    const [collectionData, setcollectionData] = useState<Collection>();
    const [listed, setListed] = useState<any>();
    const [all, setAll] = useState<any>();
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
    
            const getData: Token[] = []
            await Promise.all(obj.listed.map(async(dataRes:any) => {
                const getNftMetaData: any = await fetchNft(obj.contract, dataRes.id)
                getMeta(getNftMetaData?.token_uri as string).then(dataGetRes=>{
                    getData.push({
                        id: dataRes?.id,
                        collection:obj?.contract,
                        exchange:obj.exchange,
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
                })
            })).then(() => {
                // console.log(removeDuplicatesById(getData))
                // setListed(removeDuplicatesById(getData))
                setListed(getData)
            });
        })
        return collectionData
    }
    const getAll = async()=>{
        let data = await getData()
        let contract = await getContractFromExchange(pathname.replace("/collections/",""))
        await fetchAll(contract).then(dataRes=>{
            console.log(dataRes)
            setAll(dataRes)
        })
    }
    getAll()
        // fetchNftContractState()
    },[])
    if (collectionData === undefined) {
        return <div>Loading...</div>
    }
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
                                    src={collectionData?.logo_uri ? collectionData?.logo_uri : "/assets/images/avatar/avt-author-tab.jpg"}
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
                                        defaultValue={collectionData?.contract}
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="btn-copycode"
                                        onClick={() => navigator.clipboard.writeText(collectionData?.contract)}
                                    >
                                        <i className="icon-fl-file-1" />
                                    </button>
                                </form>
                            </div>
                            <div className="widget-social style-3">
                                <ul>
                                    <li>
                                        <a
                                            href={
                                                collectionData?.twitter
                                            }
                                        >
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li className="style-2">
                                        <a>
                                            <i className="fab fa-telegram-plane" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <ul className="menu-tab flex">
                            <li className={`tablinks ${"inactive"}`}>Listed: {listed?.length}</li>
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
                        {listed?.length>0&&listed?.map((item:any) => {
                            console.log(item)
                            return(
                            <div
                                key={item.id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <ProductCard6 data={item} />
                            </div>
                        )})}
                        {/* {getCurrentTab == "all"&&all?.map((item: any) => {
                            let metadata_call =  use(fetch(item?.metadata_uri?.replace("ipfs://", "https://ipfs.io/ipfs/")))
                            let metadata = use(metadata_call.json())
                            return (
                                <div
                                    key={item.id}
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                >
                                    <>
                                        <div className="sc-card-product explode style2 mg-bt">
                                            <div className="card-media">
                                                <img
                                                height={500}
                                                width={500}
                                                src={metadata?.media.replace("ipfs://", "https://ipfs.io/ipfs/") ?? metadata?.Media.replace("ipfs://", "https://ipfs.io/ipfs/")}
                                                alt="Image"
                                                />
                                            </div>
                                            <div className="card-title">
                                            <h5>
                                            {metadata?.title}
                                            </h5>
                                            </div>
                                        </div>
                                        </>
                                </div>
                            )
                        })} */}
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

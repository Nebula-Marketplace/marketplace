"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getContractFromExchange,fetchNft } from "@/utils/exchangeApi";

import axios from "axios"
// interface Props {
//     data: {
//         id: number;
//         hert: number;
//         status: string;
//         img: string;
//         auction: number;
//         title: string;
//         tag: string;
//         eth: number;
//         author: { status: string; name: string; avatar: string };
//         history?: boolean;
//     };
// }

export default function ProductCard({contract, data }:any): JSX.Element {
    const [isHeartToggle, setHeartToggle] = useState<number>(0);
    const [nftData,setNftData] = useState<any>({})
    const [contractData,setContractData]=useState<any>({})

    const pathname = usePathname();
    useEffect(()=>{
        if(data){
            // console.log(data)
        // fetchNft("inj10htqhgf76tnjhqtl968v5e3mue9mldnx0gteg5",1).then((dataGet:any)=>{
            fetchNft(contract,1).then((dataGet:any)=>{   
            getMeta(dataGet?.token_uri as string).then(dataGetRes=>{
              setNftData({
        id: data,
        hert: 10,
        status: "",
        img: dataGetRes?.media,
        auction: 1,
        title: dataGetRes?.string,
        tag: dataGetRes?.string,
        eth: data?.price,
        author: { status: "string", name: "string", avatar: "string" },
        history: true,
              })

            })
        })
        }
        getContractFromExchange(contract).then((data)=>{
            setContractData(data)
         
        })
    },[])
  async function getMeta(path:string) {
    const httpUrl = path.replace("ipfs://", "https://ipfs.io/ipfs/");
        let data = (await axios.get(httpUrl)).data;
        return data;
    }
    // heart toggle
    const heartToggle = () => {
        if (isHeartToggle === 0) {
            return setHeartToggle(1);
        }
        setHeartToggle(0);
    };

    return (
        <>
            <div className="sc-card-product explode style2 mg-bt">
                <div className="card-media">
                    <Link href="/item-details-1">
                        <img
                            height={500}
                            width={500}
                            src={nftData?.img?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                            alt="Image"
                        />
                    </Link>
                    <div className="button-place-bid">
                        <a
                            data-bs-toggle="modal"
                            data-bs-target="#popup_bid"
                            className="sc-button style-place-bid style bag fl-button pri-3"
                        >
                            <span>Buy</span>
                        </a>
                    </div>
                    {nftData.status !== "" && (
                        <div className="coming-soon">coming soon</div>
                    )}
                    <button
                        onClick={heartToggle}
                        className={`wishlist-button heart ${
                            isHeartToggle === 1 ? "active" : ""
                        } `}
                    >
                        <span className="number-like">
                            {nftData.hert + isHeartToggle}
                        </span>
                    </button>
                </div>
                <div className="card-title">
                    <h5>
                        <Link href="/item-details-1">{nftData.title}</Link>
                    </h5>
                </div>
                {/* <div className="meta-info">
                    <div className="author">
                        <div className="avatar">
                            <Image
                                height={100}
                                width={100}
                                src={data.author.avatar}
                                alt="Image"
                            />
                        </div>
                        <div className="info">
                            <span>Creator</span>
                            <h6>
                                <Link href="/authors-2">
                                    {nftData.author.name}
                                </Link>
                            </h6>
                        </div>
                    </div>
                    <div className="tags">{data.tag}</div>
                </div> */}
                <div className="card-bottom style-explode">
                    <div className="price">
                        <span>Listed Price</span>
                        <div className="price-details">
                            <h5>{data.eth} INJ</h5>

                        </div>
                    </div>
                    {pathname === "/home-2" || data.history ? (
                        <Link
                            href="/activity-1"
                            className="view-history reload"
                        >
                            View History
                        </Link>
                    ) : undefined}
                </div>
            </div>
        </>
    );
}

"use client";
import Image from "next/image";
import ItemDetailsTab from "../element/ItemDetailsTab";
import Countdown from "react-countdown";
import Link from "next/link";
import { CollectionContract, Phase } from "@/data/types/Contract";
import useWallet from "@/hooks/useWallet";
import {Collection} from "@/data/types/Collection";
import { getActivePhase } from "@/data/external/injective-api";

interface Props {
    data: {
    collection: CollectionContract,
    activePhase: Phase
    }
}

export default function Mint({ data }: Props): JSX.Element {
    const wallet = useWallet();

    function isWhitelist(){ 
        try{
            if(wallet) {
                if(data.activePhase.allowed.includes(wallet.account.address)) 
                { return true;}
            return false;
            }
        }
        catch(e){
            return false;
        }
    }
    
    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: any): JSX.Element | string => {
        if (completed) {
            return "Completed";
        } else {
            return (
                <p className="js-countdown">
                    <span className="countdown__value">{days}</span>
                    <span className="countdown__label">:</span>
                    <span className="countdown__value">{hours}</span>
                    <span className="countdown__label">:</span>
                    <span className="countdown__value">{minutes}</span>
                    <span className="countdown__label">:</span>
                    <span className="countdown__value">{seconds}</span>
                </p>
            );
        }
    };

    // Usage:
   
    return (
        <>
            <div className="tf-section tf-item-details style-2">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                    <Image
                                        height={600}
                                        width={600}
                                        src={data.collection.data.logo_uri}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <div className="meta-item">
                                        <div className="left">
                                            <h2>
                                                {data.collection.data.collection}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="client-infor sc-card-product">
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <Image
                                                        height={200}
                                                        width={200}
                                                        src={data.collection.data.logo_uri}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Contract</span>
                                                    <h6>
                                                        {(data.collection.data.contract)}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="meta-item-details">
                                        <div className="item-style-2 item-details">
                                            <ul className="list-details">
                                            <li>
                                                    <span>Collection Name: </span>
                                                    <h6>{data.collection.data.collection}</h6>
                                                </li>
                                            <li>
                                                    <span>Token Symbol : </span>
                                                    <h6>{data.collection.data.symbol}</h6>
                                                </li>
                                                <li>
                                                    <span>Supply :</span>
                                                    <h6>{data.collection.data.supply}</h6>
                                                </li>
                                                <li>
                                                    <span>Minted :</span>
                                                    <h6>{data.collection.data.minted ?? "?"} / {data.collection.data.supply}</h6>
                                                </li>                                                             
                                            </ul>
                                        </div>
                                        <div className="item-style-2">
                                            <div className="item meta-price">
                                                <span className="heading">
                                                    Current Phase
                                                </span>
                                                <div className="price">
                                                    <div className="price-box">
                                                        <h5>{data.activePhase.name}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item meta-price">
                                                <span className="heading">
                                                    Current Price
                                                </span>
                                                <div className="price">
                                                    <div className="price-box">
                                                        <h5> {(data.activePhase.price)/10**18} INJ</h5>
                                                        {/* <span>= $14.00</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div
                                                className="item count-down"
                                                style={{ padding: "12px" }}
                                            >
                                                <Countdown
                                                    date={
                                                        (data.activePhase.ends) * 1000
                                                    }
                                                    renderer={renderer}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        isWhitelist() ? <a
                                        data-bs-toggle="modal"
                                        data-bs-target="#popup_bid"
                                        className="sc-button loadmore style bag fl-button pri-3"
                                    >
                                        <span>Mint</span>
                                    </a>:
                                        <div className="sc-button fl-button pri-3">
                                            <span>Not In Allowlist</span>
                                        </div> 
                                        
                                    }
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

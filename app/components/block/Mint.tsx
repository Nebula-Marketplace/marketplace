"use client";
import Image from "next/image";
import ItemDetailsTab from "../element/ItemDetailsTab";
import Countdown from "react-countdown";
import Link from "next/link";
import { Phase } from "@/data/types/Contract";

import {Collection} from "@/data/types/Collection";
import { getActivePhase } from "@/data/external/injective-api";

interface Props {
    data: {
    collection: Collection,
    activePhase: Phase
    }
}

export default function Mint({ data }: Props): JSX.Element {


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
    function getCurrentPhase() {
        const phases = [
            { name: 'OG', start: 1699207200, end: 1699210800, price: 500000000000000000 },
            { name: 'VIP', start: 1699210800, end: 1699214400, price: 600000000000000000 },
            { name: 'Whitelist', start: 1699214400, end: 1699218000, price: 600000000000000000 },
            { name: 'Public', start: 1699218000, end: 9223372036854775807, price: 700000000000000000 }
        ];
        const now = Math.floor(Date.now() / 1000); // current timestamp in seconds
    
        for (let i = 0; i < phases.length; i++) {
            const phase = phases[i];
            if (now >= phase.start && now < phase.end) {
                return {
                    endTime: phase.end,
                    price: phase.price,
                    phase: phase.name
                };
            }
        }
    
        return null; // return null if no current phase is found
    }
    
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
                                        src={data?.collection?.Metadata?.Cover}
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
                                                {data?.collection?.Name}
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
                                                        src={data?.collection?.Metadata?.Cover}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Contract</span>
                                                    <h6>
                                                        {data?.collection?.ContractAddress}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        {data?.collection?.Metadata?.Description}
                                    </p>
                                    <div className="meta-item-details">
                                        <div className="item-style-2 item-details">
                                            <ul className="list-details">
                                            <li>
                                                    <span>Collection Name: </span>
                                                    <h6>{data?.collection?.Name}</h6>
                                                </li>
                                            <li>
                                                    <span>Token Symbol : </span>
                                                    <h6>{data?.collection?.Symbol}</h6>
                                                </li>
                                                <li>
                                                    <span>Supply :</span>
                                                    <h6>{data?.collection?.Supply}</h6>
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
                                                        <h5>{(getCurrentPhase()?.phase ?? 0)}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item meta-price">
                                                <span className="heading">
                                                    Current Price
                                                </span>
                                                <div className="price">
                                                    <div className="price-box">
                                                        <h5> {(getCurrentPhase()?.price ?? 0)/10**19} INJ</h5>
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
                                                        (getCurrentPhase()?.endTime ?? 0) * 1000
                                                    }
                                                    renderer={renderer}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        data-bs-toggle="modal"
                                        data-bs-target="#popup_bid"
                                        className="sc-button loadmore style bag fl-button pri-3"
                                    >
                                        <span>Mint</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

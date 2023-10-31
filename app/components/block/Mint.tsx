"use client";
import Image from "next/image";
import ItemDetailsTab from "../element/ItemDetailsTab";
import Countdown from "react-countdown";
import Link from "next/link";

import {Collection} from "@/data/types/Collection";

interface Props {
    data: Collection
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

    return (
        <>
            <div className="tf-section tf-item-details style-2">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                    <Image
                                        height={1000}
                                        width={1000}
                                        src={data.Metadata.Cover}
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
                                                {data.Name}
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
                                                        src="/assets/images/avatar/avt-8.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Contract</span>
                                                    <h6>
                                                        <Link href="/authors-2">
                                                        234262342
                                                        </Link>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        {data.Metadata.Description}
                                    </p>
                                    <div className="meta-item-details">
                                        <div className="item-style-2 item-details">
                                            <ul className="list-details">
                                            <li>
                                                    <span>Collection Name: </span>
                                                    <h6>{data.Name}</h6>
                                                </li>
                                            <li>
                                                    <span>Token Symbol : </span>
                                                    <h6>{data.Symbol}</h6>
                                                </li>
                                                <li>
                                                    <span>Supply :</span>
                                                    <h6>{data.Supply}</h6>
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
                                                        <h5> OG MINT</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item meta-price">
                                                <span className="heading">
                                                    Current Price
                                                </span>
                                                <div className="price">
                                                    <div className="price-box">
                                                        <h5> 2 INJ</h5>
                                                        <span>= $14.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div
                                                className="item count-down"
                                                style={{ padding: "12px" }}
                                            >
                                                <Countdown
                                                    date={
                                                        Date.now() +
                                                        1000 *
                                                            60 *
                                                            60 *
                                                            24 *
                                                            4.343
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

"use client"
import CollectionListCard from "../card/CollectionListCard";
import Link from "next/link";
import {getUnclaimedCollections} from "@/data/external/injective-api";
import { fetchNftContracts,fetchActiveExchanges,fetchListed,getContractFromExchange } from "@/utils/exchangeApi";
import { useEffect,useState } from "react";


export default  function UnclaimedCollections({exchanges,listedNfts}:any): JSX.Element {
    // const data = await getUnclaimedCollections();
    // useEffect(() => {
    //     let getALLContract:any[] =[]
    //     fetchNftContracts()
    //         .then(data =>{ 
    //             getALLContract = (data as any)
    //             fetchActiveExchanges()
    //             .then(dataRes =>{ 
    //                 // (data as any)
    //         //         console.log(getALLContract)
    //         // console.log(dataRes)
    //     })
    //         .catch(error => console.error(error));

        

    //     })
    //         .catch(error => console.error(error));
    // }, []);

    return (
        <>
            <section className="tf-section tf-rank">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-md-12 mb-24">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title text-left">
                                    Unclaimed Collections
                                </h2>
                                <Link href="/collections/explore" className="exp">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="table-ranking">
                                <div className="flex th-title">
                                    <div className="column1">
                                        <h3>Collection</h3>
                                    </div>
                                    <div className="column">
                                        <h3>SUPPLY</h3>
                                    </div>
                                    {/* <div className="column">
                                        <h3>Assets</h3>
                                    </div> */}
                                </div>
                                {exchanges?.map((item:string,index:number) => (
                                    <CollectionListCard
                                    key={index}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

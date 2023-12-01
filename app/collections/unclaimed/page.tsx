"use client"
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";
import UnclaimedCollections from "@/app/components/block/UnclaimedCollections";
import { fetchNftContracts,fetchActiveExchanges,fetchListed,getContractFromExchange } from "@/utils/exchangeApi";
import React, { useEffect, useState } from 'react';
import HelpModal from "@/app/components/modal/helpModal";

const item = {
    title: "Community",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Collections",
            path: "/collections"
        },
        {
            name: "Unclaimed Collections"

        }
    ],
};

// export const metadata: Metadata = {
//     title: "Nebula | NFT Marketplace | Community",
// };

export default function Page(): JSX.Element {
    const [contracts, setContracts] = useState(null);
    const [exchanges, setExchanges] = useState<any[]>([]);
    const [listed,setListed]=useState<any[]>([])
    const [unclaimed, setUnclaimed] = useState<string[]>([]);
    useEffect(() => {
        fetchNftContracts()
            .then(data =>{ setContracts(data as any)
            // console.log(data)
        })
            .catch(error => console.error(error));
        fetchActiveExchanges()
            .then(data =>{ setExchanges(data as any)
        

        })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        if(exchanges){
         console.log(exchanges)
         exchanges.map((data)=>{
            fetchListed(data).then(dataGet =>{ setListed([...exchanges,...dataGet])
                console.log(dataGet)
            })
                .catch(error => console.error("Maybe here? " + error));
         })

            }
    }, [exchanges]);
    useEffect(() => {
        fetchNftContracts().then(data => setUnclaimed(data))
        if (exchanges) {
            exchanges.map((exchange) => {
                getContractFromExchange(exchange).then(dataGet => {
                    setUnclaimed(unclaimed.filter((item) => item !== dataGet))
                }).catch(error => console.error("Here" + error));
            })
        }
        console.log(unclaimed)
    }, [unclaimed])

    return (
        <>
            <Breadcrumb data={item} />
            {exchanges?.length>0&& <UnclaimedCollections exchanges={exchanges} listedNfts={listed} unclaimed={unclaimed}/>}
            <HelpModal></HelpModal>
        </>
    );
}

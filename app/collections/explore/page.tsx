'use client'
import Breadcrumb from "@/app/components/breadcrumb";
import { Metadata } from "next";
import Explorer from "@/app/components/block/Explorer";
import { fetchNftContracts,fetchActiveExchanges,fetchListed,getContractFromExchange } from "@/utils/exchangeApi";
import React, { useEffect, useState } from 'react';
const item = {
    title: "Explore",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Collections",
            path: "/collections/explore",
        },
        {
            name: "Explore",
        }
    ],
};

// export const metadata: Metadata = {
//     title: "Nebula | NFT Marketplace | Explore",
// };

export default function Page(): JSX.Element {
    const [contracts, setContracts] = useState(null);
    const [exchanges, setExchanges] = useState<any[]>([]);
    const [listed,setListed]=useState<any[]>([])
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
            fetchListed(data).then(dataGet => { setListed([...exchanges,...dataGet])
                console.log(dataGet)
            })
                .catch(error => console.error(error));
         })

            }
    }, [exchanges]);

    return (
        <>
            <Breadcrumb data={item} />
           {exchanges?.length>0 && <Explorer exchanges={exchanges} listedNfts={listed}/>}
        </>
    );
}

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getContractFromExchange, fetchNft,fetchNftContractState} from "@/utils/exchangeApi";

interface Props {
    data: string
}

export default function CollectionListCard({ data }: Props): JSX.Element {
    const [collectionData, setcollectionData] = useState<any>(data);
    const [contractData, setContractData] = useState<any>({});
    // console.log(collectionData)
    useEffect(()=>{
      fetchNftContractState(data).then((dataRes)=>{
        setcollectionData({
          banner_uri:dataRes.banner_uri,
          logo_uri:dataRes.logo_uri,
          name:dataRes.collection,
          supply:dataRes.supply,
          contract:dataRes.supply,
          exchange:data
        })
        console.log(dataRes)
      })
    },[])
    return (
        <>
        {!collectionData?.banner_uri&&
          <Link href={`/collections/claim/${collectionData?.contract}`}>
            <div className="fl-blog">
                <div className="item flex">
                    <div className="infor-item flex column1">  
                        <div className="content-collection">
                            <h5 className="title mb-15">
                              {collectionData?.name}
                            </h5> 
                        </div>
                    </div>
                    <div className="column">
                        <span>{collectionData?.supply}</span>
                    </div>
                
                    {/* <div className="column td2">
                        <span>+3456%</span>
                    </div>
                    <div className="column td3">
                        <span>-564%</span>
                    </div>
                    <div className="column td4">
                        <span>12,4353 ETH</span>
                    </div>
                    <div className="column td5">
                        <span>3.3k</span>
                    </div>
                    <div className="column td6">
                        <span>23k</span>
                    </div> */}
                </div>
            </div>
            </Link>
}
        </>
    );
}

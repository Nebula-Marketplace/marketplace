"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getContractFromExchange, fetchNft,fetchNftContractState} from "@/utils/exchangeApi";

import { constructBuyMessage } from "@/utils/constructMessage";

import axios from "axios";
import { useShuttle } from "@delphi-labs/shuttle-react";
import useWallet from "@/hooks/useWallet";


export default function CollectionCard({ data }: any): JSX.Element {
  const [isHeartToggle, setHeartToggle] = useState<number>(0);
  const [collectionData, setcollectionData] = useState<any>(data);
  const [contractData, setContractData] = useState<any>({});
  // console.log(collectionData)
  useEffect(()=>{
    fetchNftContractState(data).then((dataRes)=>{
      setcollectionData({
        banner_uri:dataRes.banner_uri,
        logo_uri:dataRes.logo_uri,
        name:dataRes.collection,
        flagged: dataRes.flagged,
        exchange:data
      })
      console.log(dataRes)
    })
  },[])
  const { connect, sign, recentWallet, simulate, broadcast } = useShuttle();
  const wallet = useWallet();

  const pathname = usePathname();

  // heart toggle
  const heartToggle = () => {
    if (isHeartToggle === 0) {
      return setHeartToggle(1);
    }
    setHeartToggle(0);
  };
  // const buyNFT = async () => {
  //   if (recentWallet) {
  //     console.log("test");

  //     const getMessage = await constructBuyMessage(
  //       wallet.account?.address,
  //       data?.id.toString() as string,
  //       data?.exchange
  //     );
  //     console.log(getMessage);

  //     const messages = [getMessage];
  //     try {
  //       const response: any = await simulate({
  //         messages,
  //         wallet,
  //       });
  //       console.log(response);
  //       console.log("THIS");
  //     } catch (e) {
  //       console.log(e);
  //     }

  //     await broadcast({
  //       messages: messages,
  //       feeAmount: "50000000",
  //       gasLimit: "50000000",
  //       // memo: "",
  //       wallet: recentWallet,
  //     })
  //       .then((result: any) => {
  //         console.log("Sign result", result);
  //       })
  //       .catch((error) => {
  //         console.error("Sign error", error);
  //       });
  //     // sign({
  //     //   wallet: recentWallet,
  //     //   messages: getMessage,
  //     //   // mobile: isMobile(),
  //     // })
  //     // console.log(rundata)
  //   }
  // };
  console.log(collectionData)
  return (
    <>
         {collectionData?.logo_uri && <Link href={`/collections/${collectionData?.exchange}`}>
      <div className="sc-card-product explode style2 mg-bt">
        <div className="card-media">
            <img
              height={500}
              width={500}
              src={collectionData?.banner_uri?.replace("ipfs://", "https://ipfs.io/ipfs/")}
              alt="Image"
            />
        </div>
        <div className="card-title">
          <h5>
            <Link href={`/collections/${collectionData?.exchange}`}>{collectionData.name}</Link>
          </h5>
          {/* {!collectionData.flagged && <span className="flagged">Flagged</span>} */}
          {/* TODO: Add flag image if collectionData.flagged */}
        </div>
        <div className="meta-info">
                    <div className="author">
                        <div className="avatar">
                            <img
                                height={100}
                                width={100}
                                src={collectionData.logo_uri}
                                alt="Image"
                            />
                        </div>
                        <div className="info">
                            <span>Creator</span>
                            <h6>
                                <Link href={`/collections/${collectionData?.exchange}`}>
                                    {collectionData.name}
                                </Link>
                            </h6>
                        </div>
                    </div>
                    {/* <div className="tags">{data.tag}</div> */}
                </div>
      </div>
      </Link>
}
    </>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getContractFromExchange,fetchNft,checkIfExchangeExists } from "@/utils/exchangeApi";
import axios from "axios"
import {constructListMessage,constructDelistMessage } from "@/utils/constructMessage";

import { useShuttle } from "@delphi-labs/shuttle-react";
import useWallet from "@/hooks/useWallet";
import LiveAuctionModal from "../modal/LiveAuctionModal"
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
interface ExchangeExistsResponse {
    status: boolean;
    exchange: string;
    // include other properties if any
  }
export default function ProductCard({data}:any): JSX.Element {
    const [isHeartToggle, setHeartToggle] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [type, setType] = useState<string>("list");

    const [nftData,setNftData] = useState<any>({})
    const [contractData,setContractData]=useState<any>({})
    const { connect,sign,recentWallet, simulate ,broadcast } = useShuttle();
    const wallet  = useWallet();
    const pathname = usePathname();
    
    useEffect(()=>{
        if(data){
        setNftData({
            collection:data.collection,
            exchange:data.exchange,
            id: data?.id,
            hert: 10,
            status: "",
            img: data?.img,
            auction: 1,
            title: data?.metadata?.title,
            tag: data?.string,
            price: data?.price||"",
            author: { status: "string", name: "string", avatar: "string" },
            history: true,
            type:data?.type||""
            })
        }
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
    const handleShow = ()=>{
        setShow(false)
    }
    const listNFT = async (listAmount:number) => {
        const exchangeExists =await checkIfExchangeExists(nftData.collection) as ExchangeExistsResponse
        console.log(exchangeExists) 
        if (recentWallet) {
          const getMessage = await constructListMessage(
            wallet.account?.address,
            data.id,
             nftData.collection,
            Math.abs(listAmount).toString(),
            exchangeExists?.exchange)
          console.log(getMessage)
    
    const messages = getMessage
    try{
    const response: any = await simulate({
      messages,
      wallet,
    });
    console.log(response)
    }catch(e){
      console.log(e)
    }
    
      await broadcast({
              messages: getMessage,
              feeAmount: "50000000", 
              gasLimit: "50000000", 
              // memo: "",
              wallet:recentWallet
          }).then((result: any) => {
            console.log("Sign result", result);
            setShow(false)
          })
          .catch((error) => {
            console.error("Sign error", error);
          });
          // sign({
          //   wallet: recentWallet,
          //   messages: getMessage,
          //   // mobile: isMobile(),
          // })
          // console.log(rundata)
        
      }
    }
      const deListNft = async ()=>{
        if (recentWallet) {
            console.log("test")
      
            const getMessage = await constructDelistMessage(
              wallet.account?.address,
              nftData.id,
               nftData.exchange
               )
            console.log(getMessage)
      
      const messages = getMessage
      try{
      const response: any = await simulate({
        messages,
        wallet,
      });
      console.log(response)
      console.log("THIS")
      }catch(e){
        console.log(e)
      }
      
        await broadcast({
                messages: getMessage,
                feeAmount: "50000000", 
                gasLimit: "50000000", 
                // memo: "",
                wallet:recentWallet
            }).then((result: any) => {
              console.log("Sign result", result);
            })
            .catch((error) => {
              console.error("Sign error", error);
            });
            // sign({
            //   wallet: recentWallet,
            //   messages: getMessage,
            //   // mobile: isMobile(),
            // })
            // console.log(rundata)
          
        }
      }
    return (
        <>
            <div className="sc-card-product explode style2 mg-bt">
                <div className="card-media">
                    {/* <Link href="/item-details-1"> */}
                        <img
                            height={500}
                            width={500}
                            src={nftData?.img?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                            alt="Image"
                        />
                    {/* </Link> */}
                    <div className="button-place-bid">
                        <a
                            data-bs-toggle="modal"
                            data-bs-target="#popup_bid"
                            className="sc-button style-place-bid style bag fl-button pri-3"
                            onClick={nftData?.type=="listed"?()=>deListNft():()=>setShow(true)}
                        >
                            <span>{nftData?.type=="listed"?"Delist":"List"}</span>
                        </a>
                    </div>
                    {nftData.status !== "" && (
                        <div className="coming-soon">coming soon</div>
                    )}
                    {/* <button
                        onClick={heartToggle}
                        className={`wishlist-button heart ${
                            isHeartToggle === 1 ? "active" : ""
                        } `}
                    >
                        <span className="number-like">
                            {nftData.hert + isHeartToggle}
                        </span>
                    </button> */}
                </div>
                <div className="card-title">
                    {/* <h5>
                        <Link href="/item-details-1">{nftData.title}</Link>
                    </h5> */}
                </div>
                <div className="meta-info">
                    <div className="author">
       
                        <div className="info">
                            <span>Creator</span>
                            <h6> {nftData?.title}</h6>
                            {/* <h6>
                                <Link href="/authors-2">
                                </Link>
                            </h6> */}
                        </div>
                    </div>
                    <div className="tags">{data.tag}</div>
                </div>
                <div className="card-bottom style-explode">
                    {nftData?.type=="listed"&&
                    <div className="price">
                        <span>Listed Price</span>
                        <div className="price-details">
                            <h5>{(parseFloat(nftData.price)/ 10**19).toFixed(2)} INJ</h5>

                        </div>
                    </div>
                        }
                </div>
            </div>
            <LiveAuctionModal show={show} type={type} handleShow={handleShow} functionRun={listNFT}/>

        </>
    );
}

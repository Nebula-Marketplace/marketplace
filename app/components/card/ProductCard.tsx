"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getContractFromExchange, fetchNft } from "@/utils/exchangeApi";
import { pitcher } from "@/utils/exchangeApi";
import { constructBuyMessage } from "@/utils/constructMessage";

import axios from "axios";
import { useShuttle } from "@delphi-labs/shuttle-react";
import useWallet from "@/hooks/useWallet";
import { error } from "console";
interface Props {
  data: {
    id: number;
    hert: number;
    status: string;
    img: string;
    auction: number;
    title: string;
    tag: string;
    eth: number;
    collection:string,
    exchange:string,
    author: { status: string; name: string; avatar: string };
    history?: boolean;
  };
}

export default function ProductCard({ data }: Props): JSX.Element {
  const [isHeartToggle, setHeartToggle] = useState<number>(0);
  const [nftData, setNftData] = useState<any>(data);
  const [contractData, setContractData] = useState<any>({});
  // console.log(nftData)
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
  const buyNFT = async () => {
    if (recentWallet) {
      console.log("test");
// alert(data?.id)
      const getMessage = await constructBuyMessage(
        wallet.account?.address,
        data?.id.toString() as string,
        data?.exchange
      ) ?? pitcher("Could not construct Buy Message");
      console.log(getMessage);

      let messages;
      if (getMessage) {
        messages = [getMessage];
      } else {
        throw new Error("Could not construct Buy Message");
      }
      try {
        const response: any = await simulate({
          messages,
          wallet,
        });
        console.log(response);
        console.log("THIS");
      } catch (e) {
        console.log(e);
      }

      await broadcast({
        messages: messages,
        feeAmount: "50000000",
        gasLimit: "50000000",
        // memo: "",
        wallet: recentWallet,
      })
        .then((result: any) => {
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
  };
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
              onClick={() => buyNFT()}
            >
              <span>Buy</span>
            </a>
          </div>
          {nftData.status !== "" && (
            <div className="coming-soon">coming soon</div>
          )}
        </div>
        <div className="card-title">
          <h5>
           {nftData.title}
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
              <h5>
                {(parseFloat(nftData.price) /  10**19).toFixed(2)} INJ
              </h5>
            </div>
          </div>
          {/* {pathname === "/home-2" || data.history ? (
            <Link href="/activity-1" className="view-history reload">
              View History
            </Link>
          ) : undefined} */}
        </div>
      </div>
    </>
  );
}

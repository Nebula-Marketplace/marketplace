"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getContractFromExchange,
  fetchNft,
  checkIfExchangeExists,
} from "@/utils/exchangeApi";
import axios from "axios";
import {
  constructListMessage,
  constructDelistMessage,
  constructTransferMessage,
} from "@/utils/constructMessage";

import { useShuttle } from "@delphi-labs/shuttle-react";
import useWallet from "@/hooks/useWallet";
import LiveAuctionModal from "../modal/LiveAuctionModal";
import TransferModal from "../modal/TransferModal";

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
export default function ProductCard({ data }: any): JSX.Element {
  const [isHeartToggle, setHeartToggle] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [showTransferModal, setTransferModal] = useState<boolean>(false);

  const [type, setType] = useState<string>("list");

  const [nftData, setNftData] = useState<any>({});
  const [contractData, setContractData] = useState<any>({});
  const { connect, sign, recentWallet, simulate, broadcast } = useShuttle();
  const wallet = useWallet();
  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      console.log(data);
      setNftData({
        collection: data.collection,
        id: data?.id,
        status: "",
        img: data?.img,
        auction: 1,
        title: data?.metadata?.title || data?.metadata?.name,
        tag: data?.string,
        price: data?.price || "",
        author: { status: "string", name: "string", avatar: "string" },
        history: true,
        type: data?.type || "",
        listed: data?.isListed ?? data?.listed ?? data?.is_listed,
      });
    }
  }, []);
  async function getMeta(path: string) {
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
  const handleShow = () => {
    setShow(false);
  };

  const handleTransferModalShow = () => {
    setTransferModal(false);
  };
  const listNFT = async (listAmount: number) => {
    const exchangeExists = (await checkIfExchangeExists(
      nftData.collection
    )) as ExchangeExistsResponse;
   if(!exchangeExists.status){
    alert("The Nft Collection hasn't created an Exchange yet, Please contact the Collection Founder to do so!")
   }
    if (recentWallet) {
      const getMessage = await constructListMessage(
        wallet.account?.address,
        data.id,
        nftData.collection,
        Math.abs(listAmount).toString(),
        exchangeExists?.exchange
      );
      console.log(getMessage);

      const messages = getMessage;

      const response: any = await simulate({
        messages,
        wallet,
      });
      console.log(response);
      await broadcast({
        messages: getMessage,
        feeAmount: "5000000",
        gasLimit: "500000",
        // memo: "",
        wallet: recentWallet,
      })
        .then((result: any) => {
          console.log("Sign result", result);
          setShow(false);
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
  const transferNft = async (address: string) => {
    if (recentWallet) {
      const getMessage = await constructTransferMessage(
        wallet?.account?.address,
        data.id,
        nftData.collection,
        address
      );
      console.log(getMessage);
      const messages = [getMessage];
      const response: any = await simulate({
        messages,
        wallet,
      });
      console.log(response);
      await broadcast({
        messages: [getMessage],
        feeAmount: "5000000",
        gasLimit: "500000",
        // memo: "",
        wallet: recentWallet,
      })
        .then((result: any) => {
          console.log("Sign result", result);
          setShow(false);
        })
        .catch((error) => {
          console.error("Sign error", error);
        });
    }
  };
  const deListNft = async () => {
    if (recentWallet) {
      console.log("test");
      const exchange = (await checkIfExchangeExists(
        nftData.collection
      )) as ExchangeExistsResponse;
     
      const getMessage = await constructDelistMessage(
        wallet.account?.address,
        nftData.id,
        exchange.exchange
      );


      const messages = getMessage;
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
        messages: getMessage,
        feeAmount: "5000000",
        gasLimit: "500000",
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
                onClick={
                  nftData?.listed ? () => deListNft() : () => setShow(true)
                }
              >
                <span>{nftData?.listed ? "Delist" : "List"}</span>
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
              <h6> {data?.title || nftData?.title}</h6>
              {/* <h6>
                                <Link href="/authors-2">
                                </Link>
                            </h6> */}
            </div>
          </div>
          {!nftData?.listed && (
            <div className="tags" onClick={() => setTransferModal(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_45_1985)">
                  <path
                    d="M18.3333 1.6665L9.16663 10.8332"
                    stroke="#ffffff"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3333 1.6665L12.5 18.3332L9.16663 10.8332L1.66663 7.49984L18.3333 1.6665Z"
                    stroke="#ffffff"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_45_1985">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
        </div>
        Go
        <div className="card-bottom style-explode">
          {nftData?.listed && (
            <div className="price">
              <span>Listed Price</span>
              <div className="price-details">
                <h5>{(parseInt(nftData.price) / 10 ** 18).toFixed(2)} INJ</h5>
              </div>
            </div>
          )}
        </div>
      </div>
      <LiveAuctionModal
        show={show}
        type={type}
        handleShow={handleShow}
        functionRun={listNFT}
      />
      <TransferModal
        showTransferModal={showTransferModal}
        type={type}
        handleTransferModalShow={handleTransferModalShow}
        functionRun={transferNft}
      />
    </>
  );
}

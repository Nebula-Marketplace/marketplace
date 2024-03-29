"use client";
import { product1 } from "@/data/product";
import { useEffect, useState } from "react";
import ProductCard6 from "../components/card/ProductCardUse";
import Link from "next/link";
import Image from "next/image";
import {
  fetchListed,
  fetchOwnedNfts,
  fetchNft,
  getMeta,
  checkIfExchangeExists,
} from "@/utils/exchangeApi";
import useWallet from "@/hooks/useWallet";
import { replaceBetween } from "@/utils/helperFunctions";

const tabs = ["ALL", "LISTED"];

export default function CollectionDetails(): JSX.Element {
  interface ExchangeExistsResponse {
    status: boolean;
    exchange: string;
    // include other properties if any
  }
  const [getCurrentTab, setCurrentTab] = useState<string>("all");
  const [nfts, setNfts] = useState<any[]>([]);
  const [listed, setListed] = useState<any[]>([]);
  // tab handler
  const tabHandler = (select: string) => {
    setCurrentTab(select);
  };
  const wallet = useWallet();
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("transfer");
  const [collectionName, setCollectionName] = useState<string>("");
  const [filteredNfts, setFilteredNfts] = useState<any[]>([]);
  useEffect(() => {
    if (wallet) {
      //fetchOwnedNfts(wallet.account.address)
      const getNfts = async () => {
        const dataGet = await fetchOwnedNfts(wallet.account.address,setFilteredNfts,setNfts,setLoading);
        console.log(dataGet);
        const getData: any[] = [];
        // await Promise.all(
        //   dataGet.map(async (data) => {
        //     const exchangeExists = (await checkIfExchangeExists(
        //       data?.contract as string
        //     )) as ExchangeExistsResponse;
        //     console.log(exchangeExists);
        //     if (exchangeExists.status) {
        //       const getlistedNfts = await fetchListed(exchangeExists.exchange);
        //       console.log(getlistedNfts);
        //       await Promise.all(
        //         getlistedNfts.reverse().map(async (dataRes: any) => {
        //           if (dataRes?.owner == wallet.account.address) {
        //             try {
        //               console.log(dataRes);
        //               const getNftMetaData: any = await fetchNft(
        //                 data?.contract as string,
        //                 dataRes.id
        //               );
        //               const dataGetRes = await getMeta(
        //                 getNftMetaData?.token_uri as string
        //               );
        //               let exists = getData.some(
        //                 (item) =>
        //                   item.id === dataRes?.id &&
        //                   item.collection === (data?.contract as string)
        //               );
        //               console.log(exists);
        //               if (!exists) {
        //                 getData.push({
        //                   id: dataRes?.id,
        //                   collection: data?.contract,
        //                   exchange: exchangeExists.exchange,
        //                   status: "",
        //                   img: dataGetRes?.media || dataGetRes?.Media || dataGetRes?.image,
        //                   auction: 1,
        //                   title: dataGetRes?.title || dataGetRes?.name,
        //                   tag: dataGetRes?.string,
        //                   eth: dataRes?.price,
        //                   author: {
        //                     status: "string",
        //                     name: "string",
        //                     avatar: "string",
        //                   },
        //                   history: true,
        //                   price: dataRes?.price,
        //                   type: "listed",
        //                   listed:true
        //                 });
        //               }
        //             } catch (e) {
        //               console.log(e);
        //             }
        //           }
        //         })
        //       );
        //     } else {
        //       Promise.all([]);
        //     }
        //   })
        // ).then(() => {
        //   // Your function here
        //   setListed(getData);
        // });
      };

      getNfts();
   
    }
  }, [wallet]);

  return (
    <>
      <section className="tf-section authors">
        <div className="ibthemes-container">
          <div className="flat-tabs tab-authors">
            <div className="author-profile flex">
              {/* <div className="feature-profile">
                                <Image
                                    height={500}
                                    width={500}
                                    style={{ height: "276px", width: "276px" }}
                                    src="/assets/images/avatar/avt-author-tab.jpg"
                                    alt="Image"
                                    className="avatar"
                                />
                            </div> */}
              {/* <div className="infor-profile">
                                <span>Collection Details</span>
                                <h2 className="title">{wallet?
                                replaceBetween(wallet.account.address?.toString(),4,40,"..."):"Connect wallet"}</h2>
                                <p className="content">
                                  Description
                                </p>
                                <form>
                                    <input
                                        type="text"
                                        className="inputcopy"
                                        defaultValue="DdzFFzCqrhshMSxABCdfrge"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="btn-copycode"
                                    >
                                        <i className="icon-fl-file-1" />
                                    </button>
                                </form>
                            </div> */}
            </div>
            <ul className="menu-tab flex">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => tabHandler(tab.toLocaleLowerCase())}
                  className={`tablinks ${
                    tab.toLocaleLowerCase().includes(getCurrentTab)
                      ? "active"
                      : ""
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
            {getCurrentTab == "all" && (
              <>
                <div className="content-tab active">
                  <div className="row">
                    {nfts.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                        >
                          <h3>{item.collectionName}</h3>
                          <br />
                        </div>
                        <div className="row">
                          {item.nfts.map((data: any) => (
                            <div
                              key={data.id}
                              className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                            >
                              <ProductCard6 data={data} />
                            </div>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="col-md-12 wrap-inner load-more text-center">
                  {/* <Link
                                href="/authors-2"
                                className="sc-button loadmore fl-button pri-3"
                            >
                                <span>Load More</span>
                            </Link> */}
                </div>
              </>
            )}
            {getCurrentTab == "listed" && (
              <>
                <div className="content-tab active">
                  <div className="row">
                    {listed.map((item) => (
                      <div
                        key={item.id}
                        className="col-xl-3 col-lg-4 col-md-6 col-6"
                      >
                        <ProductCard6 data={item} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-12 wrap-inner load-more text-center">
                  {/* <Link
                                href="/authors-2"
                                className="sc-button loadmore fl-button pri-3"
                            >
                                <span>Load More</span>
                            </Link> */}
                </div>
              </>
            )}
            {/* {myListedNfts.} */}
          </div>
        </div>
      </section>
    </>
  );
}

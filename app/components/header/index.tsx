"use client";
import Link from "next/link";
import Navigation from "./Navigation";
import Mode from "./Mode";
import useDarkModeCheck from "@/hooks/useDarkModeCheck";
import { usePathname } from "next/navigation";
import useStickyMenu from "@/hooks/useStickyMenu";
import Search1 from "./Search1";
import Search2 from "./Search2";
import WalletConnectButton from "../button/WalletConnectButton";
import Image from "next/image";
import Brand from "../image/Brand";
import { useGlobalState } from "@/utils/GlobalContext";
import { useEffect, useState } from "react";
import { fetchNftContracts,fetchActiveExchanges,fetchListed,getContractFromExchange,fetchNft,getMeta,fetchNftContractState} from "@/utils/exchangeApi";
import useWallet from "@/hooks/useWallet";

export default function Header(): JSX.Element {
  const { listed, setListed, collections, setCollections } = useGlobalState();
 const wallet = useWallet()
  const [exchanges, setExchanges] = useState<any[]>([]);
  useEffect(() => {
    fetchNftContracts()
      .then((data) => {
        // setContracts(data as any);
        // console.log(data)
      })
      .catch((error) => console.error(error));
    fetchActiveExchanges()
      .then((data) => {
        setExchanges(data as any);
        setCollections(data as any) 
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetchNftContracts()
      .then((data) => {
        // setContracts(data as any);
      })
      .catch((error) => console.error(error));
    fetchActiveExchanges()
      .then((data) => {
        setExchanges(data as any);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (exchanges) {
      console.log(exchanges);


      exchanges.map((data) => {
        fetchListed(data)
          .then((dataGet) => {
            dataGet.map(async(dataRes:any)=>{
              // console.log(data)
              const getContract = await getContractFromExchange(data)
              // console.log(getContract)
              
              fetchNft(getContract,dataRes?.id).then((dataGet:any)=>{   
                // console.log(dataGet)
                    getMeta(dataGet?.token_uri as string).then(dataGetRes=>{
               
                      setListed([...listed,...[{
                id: dataRes?.id,
                collection:getContract,
                exchange:data,
                hert: 10,
                status: "",
                img: dataGetRes?.media,
                auction: 1,
                title: dataGetRes?.string,
                tag: dataGetRes?.string,
                eth: data?.price,
                author: { status: "string", name: "string", avatar: "string" },
                history: true,
                price:dataRes?.price
                      }]])
        
                    })
                })
            })
           
            // setListed([...listed, ...dataGet]);
           
          })
          .catch((error) => console.error(error));
      });
    }
  }, [exchanges]);

  const path = usePathname();

  // is dark hook
  const isDark = useDarkModeCheck();

  // sticky menu
  const isSticky1 = true;
  const isSticky2 = true;

  return (
    <>
      <header
        id="header_main"
        className="header_1 js-header style header_2 style2"
      >
        <div className="ibthemes-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div className="wrap-box flex">
                  <div id="site-logo" className="clearfix">
                    <Brand
                      data={{
                        isDark: false,
                        altTag: "Nebula Home",
                        size: { height: 20, width: 125 },
                      }}
                    />
                  </div>
                  <div
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    className="mobile-button "
                  >
                    <span />
                  </div>

                  <Search1 />

                  <Navigation />

                  <div className="flat-search-btn flex">
                    <WalletConnectButton />
{/* {wallet&&
<Link href="/profile">
<button className="sc-button header-slider style style-1 wallet fl-button pri-1">Profile
</button>
</Link>} */}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

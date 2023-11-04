"use client";

import { useShuttle } from "@delphi-labs/shuttle-react";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/store/store-auth";
import  useWallet from "@/hooks/useWallet";
// import { init,mint } from "@/utils/nft";

import { useEffect, useState } from "react";
import {constructListMessage,constructClaimMessage } from "@/utils/constructMessage";
import useFeeEstimate from "@/utils/useFeeEstimate";
import {signWasmMsg } from "@/utils/signMessage";
import {
  WalletConnection,
  BroadcastResult,
  MsgExecuteContract,
} from "@delphi-labs/shuttle";
  import { useQuery } from "@tanstack/react-query";
  import {replaceBetween} from "@/utils/helperFunctions"
  import ConnectButtonModal from "../modal/ConnectButtonModal"

export default function WalletConnectButton(): JSX.Element {
  const dispatch = useDispatch();
  const [show,setShow] = useState(false)
  const { connect,sign,recentWallet, simulate ,broadcast,disconnectWallet,getWallets } = useShuttle();
  const wallet  = useWallet();
const handleShow=()=>{
  setShow(false)
}
  const getData = async () => {
    if (recentWallet) {
      console.log("test")

      const getMessage = await constructListMessage(
        wallet.account?.address,
        "1",
        "inj10htqhgf76tnjhqtl968v5e3mue9mldnx0gteg5",
         "10000000000",
         "inj1tz7gv5rvgtdv24u5dttszuum593n2ul8stmqhn")
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

    console.log(getData)
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
    
  }}

//  const clickTestList =() => {
//     getData()
//   }

  const onConnect = () => {
    connect({
      extensionProviderId: "keplr",
      chainId: "injective-888",
    });
    // alert("this")

//     mint(wallet.account?.address,"https://api.majin.rip/nft3.json",{
//       seller_fee_basis_points: 500,
//       creators:[{
//      "primary_sell_happened": true,
// "address": "inj1dxprjkxz06cpahgqrv90hug9d8z504j52ms07n",
// "share": 100,
//   }]})
    // getData()
  };
    return (
      <>
        <button
        onClick={!wallet?() =>
          setShow(true):()=>disconnectWallet(wallet)}
          className="sc-button header-slider style style-1 wallet fl-button pri-1"
        >
          <span>{ wallet?replaceBetween(wallet.account?.address?.toString(),4,40,"..."):"Connect"}</span>
        </button>
  <ConnectButtonModal show={show} handleShow={handleShow}/>
      </>
    );
}

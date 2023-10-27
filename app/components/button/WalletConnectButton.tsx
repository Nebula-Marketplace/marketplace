"use client";

import { useShuttle } from "@delphi-labs/shuttle-react";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/store/store-auth";
import  useWallet from "@/hooks/useWallet";
import { init,mint } from "@/utils/nft";

import { useEffect } from "react";
import {constructListMessage } from "@/utils/constructMessage";
import useFeeEstimate from "@/utils/useFeeEstimate";
import {signWasmMsg } from "@/utils/signMessage";
import {
  WalletConnection,
  BroadcastResult,
  MsgExecuteContract,
} from "@delphi-labs/shuttle";
  import { useQuery } from "@tanstack/react-query";
  import {replaceBetween} from "@/utils/helperFunctions"

export default function WalletConnectButton(): JSX.Element {
  const dispatch = useDispatch();
  const { connect,sign,recentWallet, simulate  } = useShuttle();
  const wallet  = useWallet();

  const getData = async () => {
    if (recentWallet) {
      console.log("test")

      const getMessage = await constructListMessage(wallet.account?.address,"1", "inj10htqhgf76tnjhqtl968v5e3mue9mldnx0gteg5","1000000","inj1xe7euve4wwkuqea6m9jddw5tjdzc8gdetatgrl")
      console.log(getMessage)

const messages = getMessage
const response: any = await simulate({
  messages,
  wallet,
});
console.log(response)
console.log("THIS")

    // console.log(getData)
  // await sign({
  //         messages: getMessage,
  //         feeAmount: "100000000", 
  //         gasLimit: "300000000", 
  //         // memo: "",
  //         wallet:recentWallet
  //     }).then((result: any) => {
  //       console.log("Sign result", result);
  //     })
  //     .catch((error) => {
  //       console.error("Sign error", error);
  //     });
      // broadcast({
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
    getData()
  };
    return (
      <>
        <button
        onClick={() =>
          onConnect()}
          className="sc-button header-slider style style-1 wallet fl-button pri-1"
        >
          <span>{ wallet?replaceBetween(wallet.account?.address?.toString(),4,40,"..."):"Connect"}</span>
        </button>
      </>
    );
}

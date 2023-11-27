"use client";

import { useShuttle } from "@delphi-labs/shuttle-react";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/store/store-auth";
import  useWallet from "@/hooks/useWallet";
// import { init,mint } from "@/utils/nft";

import { useEffect, useState } from "react";
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

//  const clickTestList =() => {
//     getData()
//   }

  const onConnect = () => {
    connect({
      extensionProviderId: "keplr",
      chainId: "injective-1",
    });
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

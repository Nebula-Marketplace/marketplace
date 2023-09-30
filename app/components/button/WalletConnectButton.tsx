"use client";

import { useShuttle } from "@delphi-labs/shuttle-react";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/store/store-auth";
import  useWallet from "@/hooks/useWallet";



export default function WalletConnectButton(): JSX.Element {
  const dispatch = useDispatch();
  const { connect } = useShuttle();
  const wallet  = useWallet();
  const onConnect = () => {
    connect({
      extensionProviderId: "keplr",
      chainId: "injective-888",
    });
  };

    return (
      <>
        <button
        onClick={() =>
          onConnect()}
          className="sc-button header-slider style style-1 wallet fl-button pri-1"
        >
          <span>Connect</span>
        </button>
      </>
    );
}

'use client'

import { Phase } from "@/data/types/Contract";
import { CollectionContract } from "@/data/types/Contract";
import {useState} from "react";
import { func } from "prop-types";
import { type } from "os";
import useWallet from "@/hooks/useWallet";
import { constructAndBroadcastMint, constructMintMessage } from "@/utils/constructCandy";
import { useShuttle, BroadcastResult, SigningResult, SimulateResult } from "@delphi-labs/shuttle-react";
import { toast } from "react-toastify";

interface Props {
    data: {
        collection: CollectionContract;
        activePhase: Phase;
    }
}

export default function MintModal({ data }: Props): JSX.Element {
    const wallet = useWallet();
    const {broadcast, simulate} = useShuttle();
    let [total,settotal] = useState(0);

    async function mint(){
        if(!wallet.account) {
            toast.error("Wallet Not Connected", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
        else if (total > data.activePhase.allocation) {
            toast.error("Quantity Exceeds Maximum", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
        else {
        let contract = data.collection.data.contract;
        let msg = await constructAndBroadcastMint(wallet,contract,parseInt((data.activePhase.price).toString()), total);
        console.log(msg)
        try {
            let response = await simulate({
                messages:msg.msgs,
                wallet:wallet
            });

            console.log(response);

            broadcast({
                wallet: wallet,
                messages: msg.msgs,
                gasLimit: response.fee?.gas,
                feeAmount: response.fee?.amount[0].amount
            })
            .then((result: BroadcastResult) => {
                console.log("Broadcast result", result)
                toast.success("Successful Mint", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            })
            .catch((error) => {
                console.error("Sign error", error);
                toast.error(error, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                
              });

        }catch(e){ console.log(e)}
    }
       
    };

    return (
        <>
            <div
                className="modal fade popup"
                id="popup_bid"
                tabIndex={-1}
                aria-labelledby="dialog"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body space-y-20 pd-40">
                            <h3>Mint {data?.collection?.data.collection}</h3>
                            <p className="text-center">
                                <span className="price color-popup">
                                    {data?.activePhase?.name}
                                </span>
                            </p>
                            <p>
                                Quantity: 
                            </p>
                            <input
                                type="text"
                                className="form-control quantity"
                                onChange={e=> settotal(Number(e.target.value))}
                            />
                            <div className="hr" />
                            <div className="d-flex justify-content-between">
                                <p> Phase Price</p>
                                <p className="text-right price color-popup">
                                    {(data.activePhase.price)/ 10**18} INJ
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p> Total Amount:</p>
                                <p className="text-right price color-popup">
                                    {((total*data.activePhase.price)*1.03)/ 10**18} INJ
                                </p>
                            </div>
                            <button
                            onClick={() =>mint()}
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#popup_bid_success"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                Mint
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

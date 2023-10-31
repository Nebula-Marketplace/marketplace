'use client'

import { Phase } from "@/data/types/Contract";
import {useState} from "react";
import { func } from "prop-types";
import { type } from "os";
import useWallet from "@/hooks/useWallet";
import { constructAndBroadcastMint, constructMintMessage } from "@/utils/constructCandy";
import { useShuttle, BroadcastResult, SigningResult, SimulateResult } from "@delphi-labs/shuttle-react";

interface Props {
    data: {
        contractAddress: string;
        collectionName: string;
        activePhase: Phase;
    }
}

export default function MintModal({ data }: Props): JSX.Element {
    const wallet = useWallet();
    console.log(wallet);
    const {broadcast, simulate} = useShuttle();
    let [total,settotal] = useState(0);
    
    async function mint(){
        let contract = data.contractAddress;
        let msg = await constructAndBroadcastMint(wallet,contract,data.activePhase);
        try {
            let response = await simulate({
                messages:msg.msgs,
                wallet:wallet
            });
        }catch(e){ console.log(e)}

            
        broadcast({
            wallet: wallet,
            messages: msg.msgs,
            gasLimit: "50000000",
            feeAmount: "50000000"
        })
        .then((result: BroadcastResult) => {
            console.log("Broeadcast result", result)
        })
        .catch((error) => {
            console.error("Sign error", error);
          });
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
                            <h3>Mint {data.collectionName}</h3>
                            <p className="text-center">
                                <span className="price color-popup">
                                    {data.activePhase.name}
                                </span>
                            </p>
                            <p>
                                Quantity: 
                            </p>
                            <input
                                type="text"
                                className="form-control quantity"
                                defaultValue={0}
                                onChange={e=> settotal(Number(e.target.value)*data.activePhase.price)}
                            />
                            <div className="hr" />
                            <div className="d-flex justify-content-between">
                                <p> Phase Price</p>
                                <p className="text-right price color-popup">
                                    {data.activePhase.price} INJ
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p> Total Amount:</p>
                                <p className="text-right price color-popup">
                                    {total} INJ
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

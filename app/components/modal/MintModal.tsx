'use client'

import { Phase } from "@/data/types/Contract";
import { Collection } from "@/data/types/Collection";
import {useState} from "react";
import { func } from "prop-types";
import { type } from "os";
import useWallet from "@/hooks/useWallet";
import { constructAndBroadcastMint, constructMintMessage } from "@/utils/constructCandy";
import { useShuttle, BroadcastResult, SigningResult, SimulateResult } from "@delphi-labs/shuttle-react";
import useFeeEstimate from "@/hooks/useFeeEstimate";

interface Props {
    data: {
        collection: Collection;
        activePhase: Phase;
    }
}

export default function MintModal({ data }: Props): JSX.Element {
    const wallet = useWallet();
    const {broadcast, simulate} = useShuttle();
    let [total,settotal] = useState(0);
    
    function getCurrentPhase() {
        const phases = [
            { name: 'OG', start: 1699207200, end: 1699210800, price: 500000000000000000 },
            { name: 'VIP', start: 1699210800, end: 1699214400, price: 600000000000000000 },
            { name: 'Whitelist', start: 1699214400, end: 1699218000, price: 600000000000000000 },
            { name: 'Public', start: 1699218000, end: 9223372036854775807, price: 700000000000000000 }
        ];
        const now = Math.floor(Date.now() / 1000); // current timestamp in seconds
    
        for (let i = 0; i < phases.length; i++) {
            const phase = phases[i];
            if (now >= phase.start && now < phase.end) {
                return {
                    endTime: phase.end,
                    price: phase.price,
                    phase: phase.name
                };
            }
        }
    
        return null; // return null if no current phase is found
    }
    async function mint(){
        let contract = data.collection.ContractAddress;
        let msg = await constructAndBroadcastMint(wallet,contract,parseInt((getCurrentPhase()?.price??600000000000000000).toString()), total);
        try {
            let response = await simulate({
                messages:msg.msgs,
                wallet:wallet
            });

            broadcast({
                wallet: wallet,
                messages: msg.msgs,
                gasLimit: response.fee?.gas,
                feeAmount: response.fee?.amount[0].amount
            })
            .then((result: BroadcastResult) => {
                console.log("Broeadcast result", result)
            })
            .catch((error) => {
                console.error("Sign error", error);
              });

        }catch(e){ console.log(e)}
            
       
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
                            <h3>Mint {data?.collection?.Name}</h3>
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
                                onChange={e=> settotal(Number(e.target.value)*(getCurrentPhase()?.price??600000000000000000))}
                            />
                            <div className="hr" />
                            <div className="d-flex justify-content-between">
                                <p> Phase Price</p>
                                <p className="text-right price color-popup">
                                    {(getCurrentPhase()?.price??600000000000000000)/ 10**18} INJ
                                </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p> Total Amount:</p>
                                <p className="text-right price color-popup">
                                    {total/ 10**18} INJ
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

'use client'

import { Phase } from "@/data/types/Contract";
import { CollectionContract } from "@/data/types/Contract";
import {useEffect, useState} from "react";
import { func } from "prop-types";
import { type } from "os";
import useWallet from "@/hooks/useWallet";
import { constructAndBroadcastMint, constructMintMessage } from "@/utils/constructCandy";
import { useShuttle, BroadcastResult, SigningResult, SimulateResult } from "@delphi-labs/shuttle-react";
import { toast } from "react-toastify";

interface Props {
    data: {
        candyMachine: string;
        collection: CollectionContract;
        activePhase: Phase;
    }
}

export default function helpModal({ children }: any): JSX.Element {
    const wallet = useWallet();
    const [owned, setOwned] = useState<string[]>([]);
    useEffect(() => {
        if ( wallet ) {
            fetch(`https://lcd.injective.network/cosmwasm/wasm/v1/contracts/creator/${wallet.account.address}`)
                .then(data => data.json().then(data => {
                    setOwned(data.contract_addresses)
                }))
        }
    }, [owned]);
    return (
        <>
            <div
                className="modal fade popup"
                id="help_me"
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
                            <h3>How to know which is yours</h3>
                            <div className="hr" />
                            <div className="d-flex justify-content-center">
                                <p style={{textAlign: "center"}}>Here is a list of contracts owned by you:</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                { owned && owned.map((val, index) => {
                                    return (
                                        <a key={index} style={{textAlign: "center"}} href={`/claim/${val}`}>{val}</a>
                                    )
                                })}
                                { owned.length == 0 && <p style={{textAlign: "center"}}>You don't own any contracts!</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

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
        candyMachine: string;
        collection: CollectionContract;
        activePhase: Phase;
    }
}

export default function helpModal({ children }: any): JSX.Element {
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
                            <div className="d-flex justify-content-between">
                                <p style={{textAlign: "center"}}>You can check which contract is yours by looking at your wallet on the injective explorer, then filtering by "MsgInstantiateContract". You can then check the instantiate message, or the event logs to find the contract_address attribute.</p>
                            </div>
                            <div className="d-flex justify-content-between">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

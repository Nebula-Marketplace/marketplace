"use client"

import { useEffect } from "react";

export default function ClaimCollectionWarningModal(): JSX.Element {
    useEffect(() => {
        const { Modal } = require("bootstrap");
        const myModals = new Modal("#popup_bid");
        myModals.show();
    });

    return (
        <>
            <div
                className="modal fade popup"
                id="popup_bid"
                tabIndex={100}
                aria-labelledby="dialog"
                aria-hidden="false"
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
                            <h3>Warning</h3>
                            <p className="text-center">
                                You must be the owner of this collection and be able to connect and sign an on-chain transaction to prove ownership.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

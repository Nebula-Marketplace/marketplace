import { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";
export default function LiveAuctionModal({showTransferModal,handleTransferModalShow,type,functionRun}:any): JSX.Element {
   const [transferAddress,setTransferAddress] = useState<any>(1)
    return (
        <>
                        <Modal
        open={showTransferModal}
        onClose={handleTransferModalShow}
        className={"profile-modal"}
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
                            <span aria-hidden="true" onClick={handleTransferModalShow}>×</span>
                        </button>
                        <div className="modal-body space-y-20 pd-40">
                            <h3>Tranfer an Nft</h3>
                            {/* <p className="text-center">
                                You must bid at least
                                <span className="price color-popup">
                                    4.89 ETH
                                </span>
                            </p> */}
                               <p>
                                Reciever 
                              
                            </p>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="random"
                                value={transferAddress}
                                onChange={(e)=>setTransferAddress(e.target.value)}
                            />

                            <div className="hr" />
                            <a
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#popup_bid_success"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>functionRun(transferAddress)}
                            >
                                Transfer Nft
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

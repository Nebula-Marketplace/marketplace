import { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";
export default function LiveAuctionModal({show,handleShow,type,functionRun}:any): JSX.Element {
   const [listAmount,setListAmount] = useState<number>(1)
    return (
        <>
                        <Modal
        open={show}
        onClose={handleShow}
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
                            <span aria-hidden="true" onClick={handleShow}>×</span>
                        </button>
                        <div className="modal-body space-y-20 pd-40">
                            <h3>List an Nft</h3>
                            {/* <p className="text-center">
                                You must bid at least
                                <span className="price color-popup">
                                    4.89 ETH
                                </span>
                            </p> */}
                               <p>
                                Enter List Amount in INJ.
                              
                            </p>
                            <input
                                type="number"
                                step="any"
                                min="1"
                                className="form-control"
                                placeholder="00.00 INJ"
                                value={listAmount}
                                onChange={(e)=>setListAmount(Math.abs(Number(e.target.value)))}
                            />

                            <div className="hr" />
                            <a
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#popup_bid_success"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>functionRun(listAmount* 10**19)}
                            >
                                List Nft
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

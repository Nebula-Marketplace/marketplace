import { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";
export default function LiveAuctionModal({show,handleShow,type,functionRun}:any): JSX.Element {
   const [listAmount,setListAmount] = useState<number>(0)
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
                            <span aria-hidden="true">×</span>
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
                                Enter List Amount.
                              
                            </p>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="00.00 INJ"
                                value={listAmount}
                                onChange={(e)=>setListAmount(Number(e.target.value))}
                            />

                            <div className="hr" />
                            <a
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#popup_bid_success"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>functionRun(listAmount*1000000000)}
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

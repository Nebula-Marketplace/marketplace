import { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";
export default function EmailSentModal({show,handleShow}:any): JSX.Element {
 
    return (
        <>
                <Modal
        open={show}
        onClose={handleShow}
        className={"emailsent-modal"}
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
                        <div className="modal-body space-y-20 pd-20">
                            Thank you for reaching out, our team will be in contact!
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

import { useShuttle } from "@delphi-labs/shuttle-react";
import { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";
export default function ConnectButtonModal({show,handleShow}:any): JSX.Element {
    const { connect,sign,recentWallet, simulate ,broadcast,disconnectWallet,extensionProviders } = useShuttle();
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
                        <div className="modal-body space-y-20 pd-20">
                        <div className="provider-pop-up">
        {extensionProviders?.length>0&&extensionProviders.map((provider:any) => {
        return (
          <>
          <button
            key={provider.id}
            className="provider-button"
            onClick={() =>{
              connect({
                extensionProviderId: provider.id,
                chainId: "injective-1",
              })
              handleShow()
            }
            }
            disabled={!provider.initialized}
          >
            {provider.name}
          </button>
           <br/>
           </>
        );
      })}
      </div>
     

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

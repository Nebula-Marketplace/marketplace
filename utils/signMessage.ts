import { MsgInstantiateContract, MsgExecuteContract, useShuttle } from "@delphi-labs/shuttle-react";
import useWallet from "@/hooks/useWallet"; 

export function signWasmMsg(msg: MsgExecuteContract | MsgInstantiateContract) {
    const wallet = useWallet();
    const { sign } = useShuttle();

    return sign({
        messages: [msg],
        feeAmount: "1000000000", 
        gasLimit: "3000000000", 
        memo: "",
        wallet
    });
}
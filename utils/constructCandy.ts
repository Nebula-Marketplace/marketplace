import { MsgExecuteContract, MsgInstantiateContract, WalletConnection } from "@delphi-labs/shuttle-react";
import {InstantiateCandy, Phase, RoyaltyInfo, MintMsg, Verifier} from "@/data/types/Contract";
import { sign } from "crypto";
import {useMemo} from "react";

const url = process.env.NEXT_WEB3_INJECTIVE_URL ?? "https://lcd.injective.network";
const cm_code_id = process.env.EXCHANGE_CODE_ID ?? "133";
const verifier: Verifier = JSON.parse(process.env.verifier ?? '{"private_key": "", "address": ""}');

export function constructInstantiateMessage(admin: string, collection: InstantiateCandy) {
    return new MsgInstantiateContract({
        sender: admin,
        admin: admin,
        codeId: cm_code_id,
        msg: collection,
        funds: [],
        label: "Instantiate Nebula Candy Machine"
    })
}

export function constructMintMessage(sender: string, contract: string, phase: Phase) {
    return new MsgExecuteContract({
        sender: sender,
        contract: contract,
        msg: {mint: {signature: sign( // sign the signature message
            null,
            Buffer.from(`${sender}${contract}${phase.price}${phase.allocation}`),
            verifier.private_key,
        )}},
        funds: [{"amount": (phase.price + (phase.price * 0.03)).toString(), "denom": "inj"}]
    })
}


export function constructAndBroadcastMint(wallet:WalletConnection, contract: string, price: number, quantity: number) {
    
    let msgs : MsgExecuteContract[] =  [ ];

        for (let i=0;i<quantity;i++) {
           let m :MsgExecuteContract =  new MsgExecuteContract({
                sender: wallet.account.address,
                contract: contract,
                msg: {
                    mint: {signature:"minting"}
                },
                funds: [{"amount": (100000000000).toString(), "denom": "inj"}]
            });

            msgs.push(m);
        }
        
    return {msgs};
}
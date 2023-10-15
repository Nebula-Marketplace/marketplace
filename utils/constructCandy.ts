import { MsgExecuteContract, MsgInstantiateContract } from "@delphi-labs/shuttle-react";
import {InstantiateCandy, Phase, RoyaltyInfo, MintMsg, Verifier} from "@/data/types/Contract";
import { sign } from "crypto";

const url = process.env.NEXT_WEB3_INJECTIVE_URL || "https://lcd.injective.network";
const cm_code_id = process.env.EXCHANGE_CODE_ID || "133";
const verifier: Verifier = JSON.parse(process.env.verifier ? process.env.verifier : '{"private_key": "", "address": ""}');

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
        funds: [{"amount": (parseInt(phase.price) + parseInt(phase.price) * 0.03).toString(), "denom": "inj"}]
    })
}
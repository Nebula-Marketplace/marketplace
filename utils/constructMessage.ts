import { MsgInstantiateContract } from "@delphi-labs/shuttle-react";
import { InstantiateMsg, RoyaltyInfo } from "@/data/types/Contract";

export interface InstantiationKwargs {
    logo_uri?: string;
    banner_uri?: string;
    description?: string;
}

export function constructInstantiateMessage(
    // codeID: string, // This is 116 until we update. this arg will be kept for backwards compatibility when applicable
    owner: string,
    cAddress: string,
    cName: string,
    cSymbol: string,
    cSupply: number,
    cBasisPoints: number,
    cCreators: Array<RoyaltyInfo>,
    kwargs?: InstantiationKwargs
) {
    const message: InstantiateMsg = {
        collection: cName,
        contract: cAddress,
        description: kwargs?.description || "",
        symbol: cSymbol,
        logo_uri: kwargs?.logo_uri || "",
        banner_uri: kwargs?.banner_uri || "",
        supply: cSupply,
        creators: cCreators,
        basis_points: cBasisPoints
    };
    return new MsgInstantiateContract({
        sender: owner,
        admin: owner,
        codeId: "116",
        msg: message,
        funds: [],
        label: "Instantiate Nebula Exchange Contract"
    })
}
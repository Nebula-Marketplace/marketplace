import {
    MsgExecuteContract,
    MsgBroadcasterWithPk,
    MsgInstantiateContract,
    Coin
} from "@injectivelabs/sdk-ts";
import { Network } from "@injectivelabs/networks";
  
const injectiveAddress1 = "inj1dxprjkxz06cpahgqrv90hug9d8z504j52ms07n"; // starting bal 8.95 inj
const contractAddress = "inj10htqhgf76tnjhqtl968v5e3mue9mldnx0gteg5";
const codeid = 582; // code 49 for mainnet. stay on the lookout for Nebula standard

export async function init(
        name: string, 
        symbol: string, 
        description: string, 
        max_supply: number, 
        minter: string,
        admin: string
    ) {
console.log("test")
    const msg = MsgInstantiateContract.fromJSON({
        codeId: codeid,
        sender: injectiveAddress1,
        label: "Init Cw721 for drop",
        msg: {
                "name": name,
                "symbol": symbol,
                "description": description,
                "max_supply": max_supply,
                "minter": minter
        },
        admin: admin
    });
    const txHash = await new MsgBroadcasterWithPk({
        privateKey: "0xfba424e5790c4e04553f76e68d8aaeff8c7651e83cfadde72cec5e35b7576a9d",
        network: Network.Testnet,
    }).broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress1,
    });

    console.log(txHash);
}

interface creator {
    primary_sell_happened: boolean; // set to true. only talis knows what this means.
    address: string;
    share: number; // 0-100. all creator shares must add to 100
}

interface RoyaltyInfo {
    seller_fee_basis_points: number;
    creators: Array<creator>;
}

export async function mint(owner: string, uri: string, royalties: RoyaltyInfo) {
    const msg0 = MsgExecuteContract.fromJSON({
        contractAddress: contractAddress,
        sender: injectiveAddress1,
        funds: [],
        msg: {
            "mint": {
                "owner": owner,
                "metadata_uri": uri,
                "royalty": royalties
            }
        }
    });

    const txHash = await new MsgBroadcasterWithPk({
        privateKey: "0xfba424e5790c4e04553f76e68d8aaeff8c7651e83cfadde72cec5e35b7576a9d",
        network: Network.Testnet,
    }).broadcast({
        msgs: [msg0],
        injectiveAddress: injectiveAddress1,
    });

    console.log(txHash);
}
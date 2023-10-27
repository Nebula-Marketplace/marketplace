import { MsgExecuteContract, MsgInstantiateContract } from "@delphi-labs/shuttle-react";
import { InstantiateMsg, RoyaltyInfo, BuyMsg, ListMsg, ClaimCollectionMsg } from "@/data/types/Contract";
import axios from 'axios';
import useWallet from "@/hooks/useWallet";

const url = "https://testnet.lcd.injective.network/";
const exchange_code_id = "2949"

export interface InstantiationKwargs {
    logo_uri?: string;
    banner_uri?: string;
    description?: string;
}

interface Listed {
    id: string;
    owner: string;
    is_listed: boolean;
    price: string; // uint 128 is a json string according to cw docs
    expires: number;
}

interface ListedResponse {
    data: Array<Listed>;
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
        codeId: exchange_code_id,
        msg: message,
        funds: [],
        label: "Instantiate Nebula Exchange Contract"
    })
}

export async function constructBuyMessage(
    token_id: string,
    contract: string
) {
    /*
    ToDo:
    - Query the contract for the price of the token
    - Construct Buy msg
    - Construct Execute Msg
    */
    const wallet = useWallet();
    let resp: ListedResponse = await axios.get(url + `/cosmwasm/wasm/v1/contract/${contract}/smart/${btoa(`{"GetListed":{}}`)}`);
    let state_resp = await axios.get(`https://testnet.lcd.injective.network/cosmwasm/wasm/v1/contract/${contract}/state`);
    let data = JSON.parse(atob(state_resp.data));
    let bps = data.royalties.seller_fee_basis_points / 10_000;

    for (let i = 0; i < resp.data.length; i++) {
        let price_fixed: number = parseInt(resp.data[i].price);
        if (resp.data[i].id == token_id) { 
            /* 
                gonna essentially fuzzyfind this in case type is off. 
                technically though, token_id is a u16 int, but is stored as a string. 
                Tread carefully 
            */
            const message: BuyMsg = {
                token_id: token_id
            }
            return new MsgExecuteContract({
                sender: wallet.account.address,
                contract: contract,
                msg: {"buy": message},
                funds: [{"denom": "inj", "amount": (price_fixed + (price_fixed * bps)).toString()}],
            })
        }
    }
    throw new Error("Token not found");
}

export async function constructListMessage(
    address:any,
    token_id: string,
    contract: string,
    price: string,
    exchange:string,
) {
    // const wallet = useWallet();

    
    let message: ListMsg = {
        token_id: token_id,
        price: price,
        expires: "435839745937" // this is a random number i came up with. i removed the timestamp from the contract for now. 
        // ^ must be string, numbers get rejected. Not sure why. must be a wasm vm issue. U-base types may be the issue.
    }
    return [
        new MsgExecuteContract({
            sender: address,
            contract: contract,
            msg: {
                "approve": {
                    "spender": contract,
                    "token_id": token_id
                }
            },
            funds: []
        }),
        new MsgExecuteContract({
            sender: address,
            contract: exchange,
            msg: {"list": message},
            funds: [],
        })
    ]
}

export async function constructDelistMessage(
    token_id: string,
    contract: string
) {
    const wallet = useWallet();
    let resp: ListedResponse = await axios.get(url + `/cosmwasm/wasm/v1/contract/${contract}/smart/${btoa(`{"GetListed":{}}`)}`);
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].id == token_id) { // fuzzyfind again
            const message: BuyMsg = { // these messages have the same construction; no reason to make a new type
                token_id: token_id
            };
            return new MsgExecuteContract({
                sender: wallet.account.address,
                contract: contract,
                msg: {
                    // cw contracts require msg to contain an object titled as the function name
                    "delist": message 
                },
                funds: [{"denom": "inj", "amount": resp.data[i].price.toString()}],
            });
        }
    }
    throw new Error("Token not found");
}

export async function constructTransferMessage(
    address:string,
    token_id: string,
    contract: string,
    recipient: string
) {

    let message = {
        "transfer": {
            token_id: token_id,
            recipient: recipient
        }
    };
    return new MsgExecuteContract({
        sender: address,
        contract: contract,
        msg: message,
        funds: [],
    });
}

export async function constructBurnMessage(
    token_id: string,
    contract: string,
) {
    /*
        This might not actually work; its not documented in the talis nft schema.
        I'm assuming it will work because there is a burn function on talis.
    */
    const wallet = useWallet();
    let message = {
        "burn": {
            token_id: token_id
        }
    };
    return new MsgExecuteContract({
        sender: wallet.account.address,
        contract: contract,
        msg: message,
        funds: [],
    });
}

export function constructClaimMessage(
    contract: string,
    kwargs: ClaimCollectionMsg
) {
    const wallet = useWallet();
    return new MsgExecuteContract({
        contract: contract,
        sender: wallet.account.address,
        msg: {"UpdateMetadata": kwargs},
        funds: [],
    });
}
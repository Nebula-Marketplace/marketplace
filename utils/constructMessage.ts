import { MsgExecuteContract, MsgInstantiateContract } from "@delphi-labs/shuttle-react";
import { InstantiateMsg, RoyaltyInfo, BuyMsg, ListMsg, ClaimCollectionMsg, CreateCandyMsg } from "@/data/types/Contract";
import axios from 'axios';
import useWallet from "@/hooks/useWallet";
import { Network, getNetworkEndpoints } from "@injectivelabs/networks";
import {
    ChainGrpcWasmApi,
    QueryResolverAddress
} from '@injectivelabs/sdk-ts'

const url = "https://lcd.injective.network/";
const exchange_code_id = "213"
// const exchange_code_id = "146"
const network = "mainnet"== "mainnet" ? Network.Mainnet : Network.Mainnet; 
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
        supply: parseInt(cSupply as any),
        creators: cCreators,
        basis_points: parseInt(cBasisPoints as any)
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

export function constructCw721InstantiateMessage(
    // codeID: string, // This is 116 until we update. this arg will be kept for backwards compatibility when applicable
    owner: string,
    cName: string,
    cSymbol: string,
    cSupply: number,
    kwargs?: InstantiationKwargs
) {
    const message = {
        name: cName,
        description: kwargs?.description || "",
        symbol: cSymbol,
        supply: cSupply,
    };
    return new MsgInstantiateContract({
        sender: owner,
        admin: owner,
        codeId: "49",
        msg: message,
        funds: [],
        label: "Instantiate Nebula Cw721 Contract"
    })
}

export async function getExchangeData(contract: string) {
    try{
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let nftData = (await api.fetchSmartContractState(contract, Buffer.from(`{"get_metadata": {}}`, 'binary').toString('base64'))).data;   
    const jsonString = Buffer.from(nftData).toString('utf8')
    const listed_tokens: any= JSON.parse(jsonString)
    
    return listed_tokens;
    }catch(e){
        console.log(e)
    }
}
export async function constructBuyMessage(
   address:string,
    token_id: string,
    contract: string
): Promise<MsgExecuteContract> {
    /*
    ToDo:
    - Query the contract for the price of the token
    - Construct Buy msg
    - Construct Execute Msg
    */
    try{

        let resp = await axios.get(`${url}/cosmwasm/wasm/v1/contract/${contract}/smart/${Buffer.from('{"get_listed":{}}').toString('base64')}`);
        resp = resp.data
        console.log(token_id)
        // let data = await getExchangeData(contract)
        // console.log(data)
        let state_resp = await axios.get(`${url}/cosmwasm/wasm/v1/contract/${contract}/state`);
        console.log(state_resp)
        // let data = atob(state_resp.data)
        // console.log(data)
        // let data =state_resp.data
        let data = JSON.parse(atob(state_resp.data.models[1].value))
        let bps = data.royalties.seller_fee_basis_points / 10_000;
        let price_fixed;
        console.log(data.royalties.seller_fee_basis_points)
        console.log(bps)
        console.log(resp.data)
        // for (let i = 0;   i < resp.data.length; i++) {
        // let price_fixed: number = parseInt(resp.data[i].price);
        let filtered: Listed[] = resp.data.filter((obj: any) => obj.id === token_id);

        let lastPrice;
        if (filtered.length > 0) {
        lastPrice = filtered[filtered.length - 1];
        } else {
            throw new Error("No tokens found");
        }
        console.log(lastPrice.id)
        if (lastPrice.id == token_id) { 
            /* 
                gonna essentially fuzzyfind this in case type is off. 
                technically though, token_id is a u16 int, but is stored as a string. 
                Tread carefully 
            */
            price_fixed = parseInt(lastPrice.price)
            console.log((price_fixed + (price_fixed * bps))/10**19)
        }
        const message: BuyMsg = {
            id: token_id
        }
        if (price_fixed == undefined) {
            throw new Error("Price undefined");
        }
        return new MsgExecuteContract({
            sender: address,
            contract: contract,
            msg: {"buy": message},
            funds: [{"denom": "inj", "amount": (price_fixed + (price_fixed * bps)).toString()}],
        })
    }catch(e){
        console.log(e)
        console.log(token_id)
    }
    throw new Error("Token not found")
    }

export async function constructListMessage(
    address:any,
    id: string,
    contract: string,
    price: string,
    exchange:string,
) {
    // const wallet = useWallet();
    
    let message: ListMsg = {
        id: id,
        price: price,
        expires: "2147483648" // this is a random number i came up with. i removed the timestamp from the contract for now. 
        // ^ must be string, numbers get rejected. Not sure why. must be a wasm vm issue. U-base types may be the issue.
    }
    return [
        new MsgExecuteContract({
            contract: contract,
            sender: address,
            // contract: contract,
            msg: {
                "approve": {
                    "spender": exchange,
                    "token_id": id
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
    address:string,
    token_id: string,
    contract: string
) {
 console.log(contract)
    let resp: any = await axios.get(url + `/cosmwasm/wasm/v1/contract/${contract}/smart/${Buffer.from('{"get_listed":{}}').toString('base64')}`);
    resp = resp.data
    let delistMessages=[]
    console.log(resp.data)
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].id == token_id) { // fuzzyfind again
            const message: BuyMsg = { // these messages have the same construction; no reason to make a new type
                id: token_id
            };
            delistMessages.push(new MsgExecuteContract({
                sender: address,
                contract: contract,
                msg: {
                    // cw contracts require msg to contain an object titled as the function name
                    "de_list": message 
                },
                funds: [{"denom": "inj", "amount": resp.data[i].price.toString()}],
            }));
        }
        
    }
    return delistMessages
    throw new Error("Token not found");
}

export async function constructTransferMessage(
    address:string,
    token_id: string,
    contract: string,
    recipient: string
) {

    let message = {
        "transfer_nft": {
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

export function constructCandyMessage(
    address:string,
    contract: string,
    kwargs: CreateCandyMsg
) {
        return new MsgExecuteContract({
            contract: contract,
            sender: address,
            msg: kwargs,
            funds: [],
        });
    
}

export function constructClaimMessage(
    address:string,
    contract: string,
    kwargs: ClaimCollectionMsg
) {
    return new MsgExecuteContract({
        contract: contract,
        sender: address,
        msg: {"update_metadata": kwargs},
        funds: [],
    });
}
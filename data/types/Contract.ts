export interface InstantiateMsg {
    collection: string; // name
    contract: string; // cw721 contract 
    description: string;
    symbol: string;
    logo_uri: string;
    banner_uri: string;
    supply: number;
    creators: Array<RoyaltyInfo>;
    basis_points: number;
}

export interface Verifier {
    private_key: string;
    address: string;
}

export interface InstantiateCandy {
    collection: string;
    contract: string;
    description: string;
    symbol: string;
    logo_uri: string;
    banner_uri: string;
    supply: number;
    creators: Array<RoyaltyInfo>;
    basis_points: number;
    codeid: number;
    phases: Array<Phase>;
}

export interface Phase {
    allowed: Array<string>; 
    starts: number; // timestamp
    ends: number; // timestamp
    price: string;
    allocation: number; // how many tokens can be minted in this phase per wallet
}

export interface MintMsg {
    // This is an empty message, the contract does most of the heavy lifting.
}

export interface BuyMsg { // Execute msg needs the funds to be set
    token_id: string;
}

export interface ListMsg {
    token_id: string;
    price: string;
    expires: string; // If no expirey set, make it the same date the sun is supposed to explode 👍
}

export interface RoyaltyInfo {
    share: number;
    address: String;
}

export interface ClaimCollectionMsg { // I would make these optional but they wouldnt show up in the message, thus causing an error.
    banner_uri: null | String;
    avatar_uri: null | String;
    description: null | String;
    basis_points: null | number; // 100 == 1% royalty
    creators: null | Array<RoyaltyInfo>
}

export interface ExecuteWrapperMsg {
    Mint?: MintMsg;
    Buy?: BuyMsg;
    List?: ListMsg;
    UpdateMetadata?: ClaimCollectionMsg;
}

export interface QueryWrapperMsg {
    GetMetadata?: {};
    GetListed?: {};
}
/*
Fully constructed messages look like this when serialized:
{
    "sender": "",
    "contract": "",
    "msg": {
        "action": { // "action" must be replaced with the message name. i.e, mint, buy, sell, list, etc.
            "args": ""
        }
    },
    "funds": [
        {
            "denom": "inj",
            "amount": "" // for some reason this is still a string. Rust converts it to Cosmos' Uint128 type.
        }
    ]
}
*/
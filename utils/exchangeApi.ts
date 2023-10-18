import process from 'process';
import { Network, getNetworkEndpoints } from "@injectivelabs/networks";
import {
    ChainGrpcWasmApi,
    QueryResolverAddress
} from '@injectivelabs/sdk-ts'
import axios from 'axios';

const codeID = process.env.EXCHANGE_CODE_ID ? parseInt(process.env.EXCHANGE_CODE_ID) : 130;
const talis_nft = 49;
// const nebula_nft = 200; // TODO: update this wen nebula standard is out
const network = process.env.NETWORK === "mainnet" ? Network.Mainnet : Network.Testnet; 

interface GetTokensResponse { 
    ids: string[]
}

interface TalisNftMetadata {
    title: string,
    description: string,
    media: string,
    [key: string]: string | number // nonstatic traits
}

interface Trait {
    key: string,
    value: string,
    rarity?: number // how many of this trait exists in the collection
}

interface NebulaNftMetadata {
    name: string,
    description: string,
    media: string,
    id: string,
    traits: Array<Trait>
}

interface Token {
    id: string;
    collection: string;
    owner: string;
    image_uri: string;
    metadata: TalisNftMetadata | NebulaNftMetadata;
}

export async function fetchNftContracts() {
    /* *
     * Fetches all cw721 contracts. this 
     */
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let contracts: string[] = [];

    let talis_contracts = (await api.fetchContractCodeContracts(talis_nft)).contractsList;
    // let nebula_contracts = (await api.fetchContractCodeContracts(nebula_nft)).contractsList;

    contracts = contracts.concat(talis_contracts);
    // contracts = contracts.concat(nebula_contracts);

    return contracts;
}

async function getMeta(path: string) {
    let data = (await axios.get("https://ipfs.io/ipfs/" + path)).data;
    return data;
}

export async function fetchOwnedNfts(address: string) {
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let contracts: string[] = []
    let talis_contracts = (await api.fetchContractCodeContracts(talis_nft)).contractsList;
    // let nebula_contracts = (await api.fetchContractCodeContracts(nebula_nft)).contractsList;
    contracts = contracts.concat(talis_contracts);

    let owned: Token[] = [];

    contracts.forEach(async (contract) => {
        let data = (await api.fetchSmartContractState(contract, atob(`{"tokens": {"owner":"${address}"}}`))).data;
        const jsonString = Buffer.from(data).toString('utf8')
        const tokens: GetTokensResponse = JSON.parse(jsonString);
        tokens.ids.forEach(async (id) => {
            let data = (await api.fetchSmartContractState(contract, atob(`{"nft_info": {"token_id":"${id}"}}`))).data;
            const jsonString = Buffer.from(data).toString('utf8')
            let metadata_link: string = JSON.parse(jsonString)["token_uri"]
            const metadata: TalisNftMetadata = metadata_link.startsWith("ipfs://") ? await getMeta(metadata_link.replace("ipfs://", "")) : (await axios.get(metadata_link)).data;

            owned.push({
                id: id,
                collection: contract,
                owner: address,
                image_uri: metadata.media,
                metadata: metadata
            })
        })
    })

    return owned
}
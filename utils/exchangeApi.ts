import { Network, getNetworkEndpoints } from "@injectivelabs/networks";
import {
    ChainGrpcWasmApi
} from '@injectivelabs/sdk-ts'
import axios from 'axios';

const codeID = 213;
const talis_nft = 49;
 const nebula_nft = 200; // TODO: update this wen nebula standard is out
const network = "mainnet"== "mainnet" ? Network.MainnetSentry : Network.MainnetSentry; 

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
interface ExchangeStatus {
    status: boolean,
    contract?: string,
    exchange?: string
}
export async function pitcher(msg: string) {
    /* * throws an error for inline null checks
    */
    throw new Error(msg);
}

async function nullCheck(obj: any) {
    /* * checks if an object is null
    */
    if (obj === null || obj === undefined) {
        pitcher("Query returned null");
    }
    return obj;
}

export async function getCollectionOwner(contract: string) {
    try{
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let data = (await api.fetchContractInfo(contract));

    let owner = data?.creator ?? pitcher("Contract returned null");

    // const jsonString = Buffer.from(nullCheck(owner)).toString('utf8')
    // const owner_address: string = JSON.parse(jsonString)["owner"]

    return owner;
    }catch(e){
        console.log(e)
    }
}

export async function fetchListed(exchange: string) {
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let listed = (await api.fetchSmartContractState(exchange, Buffer.from('{"get_listed": {}}', 'binary').toString('base64'))).data;   
    const jsonString = Buffer.from(listed).toString('utf8')
    const listed_tokens: string[] = JSON.parse(jsonString)
 console.log(listed_tokens)
    return listed_tokens;
}
export async function fetchAll(contract:string) {
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);
    let out = [];

    let all = (await api.fetchSmartContractState(contract, Buffer.from('{"all_tokens": {}}', 'binary').toString('base64')));
    const jsonString = Buffer.from(all.data).toString('utf8')
    out.push(JSON.parse(jsonString))
    return out; // pagination ???
}
export async function getContractFromExchange(exchange: string) {
    try{
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);
    let paginationOptions = {
        offset: 0, // Skip the first 0 items
        limit: 100, // Limit the results to 100 items
    };
    let listed = (await api.fetchSmartContractState(exchange, Buffer.from(`{"get_metadata": {}}`, 'binary').toString('base64'))).data;
    const jsonString = Buffer.from(listed).toString('utf8')
    const listed_tokens: any = JSON.parse(jsonString)
     return listed_tokens?.contract;
    }catch(e){
        console.log
    }
}
export async function fetchNft(contract: string,id:number) {
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let nftData = (await api.fetchSmartContractState(contract, Buffer.from(`{"nft_info": {"token_id":"${id}"}}`, 'binary').toString('base64'))).data;   
    const jsonString = Buffer.from(nftData).toString('utf8')
    const listed_tokens: string[] = JSON.parse(jsonString)
    
    return listed_tokens;
}
export async function fetchActiveExchanges() {
    /* *
     * Fetches all cw721 contracts. this 
     */
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let contracts: string[] = [];
    let search=true
    let count = 0
    let pagination_key=""
    while(search){
    let paginationOptions = {
        offset: count*100, // Skip the first 100 items (i.e., the first page)
        limit: 200, // Limit the results to 100 items per page
    };
   
    let talis_contracts = (await axios.get(`https://sentry.lcd.injective.network/cosmwasm/wasm/v1/code/${codeID}/contracts?${pagination_key ? "pagination.key=" + encodeURIComponent(pagination_key) : ""}&pagination.limit=100`)).data;
        // let nebula_contracts = (await api.fetchContractCodeContracts(nebula_nft)).contractsList;
    contracts = contracts.concat(talis_contracts.contracts);
    pagination_key=talis_contracts.pagination.next_key
    if(talis_contracts.contracts.length<100){
        search = false
    }
    count = count+1
}
    // contracts = contracts.concat(nebula_contracts);
    return contracts;
}
export async function fetchNftContractState(contract:string) {
    let state_resp = await axios.get(`https://lcd.injective.network/cosmwasm/wasm/v1/contract/${contract}/state`);

    let data = JSON.parse(atob(state_resp.data.models[1].value))
    return data;
    //  console.log(data)
}
export async function fetchNftContracts() {
    /* *
     * Fetches all cw721 contracts. this 
     */
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let contracts: string[] = [];
    let search=true
    let count = 0
    let pagination_key=""
    while(search){
    let paginationOptions = {
        offset: count*100, // Skip the first 100 items (i.e., the first page)
        limit: 200, // Limit the results to 100 items per page
    };
   
    let talis_contracts = (await axios.get(`https://sentry.lcd.injective.network/cosmwasm/wasm/v1/code/49/contracts?${pagination_key ? "pagination.key=" + encodeURIComponent(pagination_key) : ""}&pagination.limit=100`)).data;
        // let nebula_contracts = (await api.fetchContractCodeContracts(nebula_nft)).contractsList;
    contracts = contracts.concat(talis_contracts.contracts);
    pagination_key=talis_contracts.pagination.next_key
    if(talis_contracts.contracts.length<100){
        search = false
    }
    count = count+1
}
    // contracts = contracts.concat(nebula_contracts);
    return contracts;
}
export async function checkIfExchangeExists(contract: string) {
    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);
    let nebula_contacts = (await api.fetchContractCodeContracts(codeID)).contractsList;
    let code49Nfts = await fetchNftContracts()
    let contracts: any[] = []
    let found_contract = {}
    // console.log(code49Nfts)
    let contractPromises = nebula_contacts.map(async(data_contract) => {
        let get_contract = await getContractFromExchange(data_contract)
        if(get_contract==contract){
            found_contract ={
                status:true,
                contract:contract,
                exchange:data_contract
            }
        }
        return get_contract;
    });
    contracts = await Promise.all(contractPromises);
    if(contracts.includes(contract)){
        return found_contract
    }else{
        return {status:false}
    }
}
export async function getMeta(path: string) {

    let data = (await axios.get(path.startsWith("ipfs://") ? await (path.replace("ipfs://", "https://ipfs.io/ipfs/")):path)).data;
    return data;
}

export async function fetchOwnedNfts(address: string,setFilteredNFTs:any,setNfts:any,setLoading:any) {
    try{

    let endpoints = await getNetworkEndpoints(network);
    let api = new ChainGrpcWasmApi(endpoints.grpc);

    let contracts: any[] = []
    // let talis_contracts = (await api.fetchContractCodeContracts(talis_nft)).contractsList;
    let nebula_contacts = (await api.fetchContractCodeContracts(codeID)).contractsList;
    let code49Nfts = await fetchNftContracts()
  console.log(nebula_contacts)
    let contractPromises = nebula_contacts.map(async(data_contract) => {
        let get_contract = await getContractFromExchange(data_contract)
        return {contract:get_contract,exchange:data_contract};
    });
    contracts = await Promise.all(contractPromises);
    console.log(contracts)
    let uniqueContracts = Array.from(new Set(code49Nfts.map(contract => contract)))
    .map(contract => {
        return code49Nfts.find(c => c === contract)
    });

    contracts = uniqueContracts;
    console.log(contracts)
    let data:any[] = [];
    const BATCH_SIZE = 1000; // Define your batch size here

    // Process in batches
    for (let i = 0; i < contracts.length; i += BATCH_SIZE) {
        const currentBatch = contracts.slice(i, i + BATCH_SIZE);
        console.log(currentBatch)
        const batchPromises = currentBatch.map(async (contract: string) => {
            try {
                let dataInfo =  (await api.fetchSmartContractState(contract, Buffer.from(`{"contract_info": {}}`, 'binary').toString('base64'))).data;
                console.log(dataInfo)
                let tokens: GetTokensResponse = { ids: [] };
                let last_id: string | undefined="";
                
                do {
                    let data = (await api.fetchSmartContractState(contract, Buffer.from(`{"tokens": {"owner":"${address}","limit":100${last_id ? `,"start_after":"${last_id}"` : ""}}}`, 'binary').toString('base64'))).data;
                    console.log(data)
                    const jsonString = Buffer.from(data).toString('utf8')
                    const newTokens: GetTokensResponse = JSON.parse(jsonString);

                    // Append new tokens to the existing list
                    tokens.ids = tokens.ids.concat(newTokens.ids);

                    // Update last_id to the last id in the tokens.ids array
                    if(tokens.ids.length==30){
                        last_id = newTokens.ids[newTokens.ids.length - 1];
                    }else{
                        last_id="" 
                    }
                } while (tokens.ids.length == 30);

                const jsonStringInfo = Buffer.from(dataInfo).toString('utf8')
                const contractInfo = JSON.parse(jsonStringInfo);
                // console.log(tokens.ids)
                if (tokens.ids.length > 0) {
                    let tokenPromises = tokens.ids.map(async (id) => {
                        let data = (await api.fetchSmartContractState(contract, Buffer.from(`{"nft_info": {"token_id":"${id}"}}`, 'binary').toString('base64'))).data;
                        const jsonString = Buffer.from(data).toString('utf8')
                        let metadata_link: string = JSON.parse(jsonString)["token_uri"]
                        const metadata: TalisNftMetadata = metadata_link.startsWith("ipfs://") ? await getMeta(metadata_link.replace("ipfs://", "https://ipfs.io/ipfs/")) : (await axios.get(metadata_link.replace("https://ipfs.talis.art/ipfs/","https://ipfs.io/ipfs/"))).data;

                        return {
                            id: id,
                            collection: contract,
                            owner: address,
                            img: typeof metadata?.Media === 'string' ? metadata?.Media?.replace("ipfs://","https://ipfs.io/ipfs/") : metadata?.media?.replace("ipfs://","https://ipfs.io/ipfs/"),                
                            metadata: metadata
                        };
                    });
                    return Promise.all(tokenPromises).then(nfts => ({collectionName: contractInfo.name,contract:nfts[0].collection, nfts}));
                } else {
                    return null; // or any other default value
                }
            }catch(e){
                console.log(e)
            }
        });
        const batchData = await Promise.all(batchPromises);
      
        let nonEmptyArrays = batchData.filter(item => item !== null);
    console.log(nonEmptyArrays)
    const flatArray = nonEmptyArrays.flat(); 
    data = [...data, ...flatArray];
    console.log(data)// flatten the array of arrays
    setFilteredNFTs(data);
    setNfts(data)
    if(data.length>0){
    setLoading(false)
    }
   
    }
    return data;
}catch(e){
    console.log(e)
}

    // flatten the array of arrays
  
}
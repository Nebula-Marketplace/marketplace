import {InjectiveApiQueryMappings, InjectiveApiEnum, InjectiveGetContractResponse, InectiveGetContractInfoByContractAddressResponse} from "@/data/external/injective-api-mapping";
import { Collection } from "@/data/types/Collection";
import { Phase } from "@/data/types/Contract";
import { getContractFromExchange, fetchNft,fetchNftContractState,getMeta} from "@/utils/exchangeApi";

const BASE_URL = process.env.NEXT_WEB3_INJECTIVE_URL;

export async function getUnclaimedCollections() : Promise<Collection[]> {
    const contracts = await getContracts();
    let collections: Array<Collection> = [];

    for await (const contract of contracts.contracts) {
        let data = await getContractInfoByContractAddress(contract);
        let collection: Collection = {
            Name: data.data.name, 
            ContractAddress: contract, 
            Symbol: data.data.symbol,
            Supply: 1,
            Metadata: {
                Banner: "",
                Cover:"",
                Description: "",
                Logo: "",
                Discord: "",
                Twitter: "",
                Telegram: "",
                Email: "",
                Website: "",
                Atlas3:""
            }
        };
        collections.push(collection)};
    return collections;
}

export async function getContracts() : Promise<InjectiveGetContractResponse> {
    const api = InjectiveApiQueryMappings.find(i => i.name === InjectiveApiEnum.get_contracts_by_code);
    let response!: InjectiveGetContractResponse;
    if(api != null)
    {
        const url = BASE_URL + api.uri;

        const res = await fetch(url, {
            method: api.method
        });

        let response = res.json();
        return response;
    }

    return response;
}

export async function getContractInfoByContractAddress(contractAddress:string) : Promise<InectiveGetContractInfoByContractAddressResponse> {
    //const api = InjectiveApiQueryMappings.find(i => i.name === InjectiveApiEnum.get_contracts_by_code);
    let data = await fetch(BASE_URL + `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/eyAiY29udHJhY3RfaW5mbyI6IHt9fQ==`)
    
    let response = data.json();

    return response;
}

export async function getActivePhase(contractAddress:string) : Promise<Phase> {
    let data = await fetch(BASE_URL + `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/eyJnZXRfcGhhc2UiOnt9fQ==`);

    let response = await data.json();
    response = response?.data
    // console.log(response)
    // const active = await fetchNftContractState(contractAddress);
    return response;

}
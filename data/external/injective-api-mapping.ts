export interface InjectiveApiMapping {
    name: InjectiveApiEnum;
    method: string;
    uri: string;
    urlParams?: {
        name:string
    }
    page: boolean;
    base64props?: string;
}

export interface InjectiveGetContractResponse {
    contracts: string[];
    pagination: {
        next_key?:string;
        total:string;
    }
}

export interface InectiveGetContractInfoByContractAddressResponse {
    data: {
        name:string;
        symbol:string;
        collection?:string;
    }
}

export enum InjectiveApiEnum {
    get_contracts_by_code
}

export const InjectiveApiQueryMappings: InjectiveApiMapping[] = [
    {
        name:InjectiveApiEnum.get_contracts_by_code,
        method:"GET",
        uri:"/cosmwasm/wasm/v1/code/49/contracts",
        urlParams: {
            name:"CODE"
        },
        page:true
    }
]
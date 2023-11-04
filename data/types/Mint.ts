export interface Mint {
    ContractAddress: string;
    Description: string;
    Denomination: string;
    Royalty: number;
    Date: string;
    Phases: MintPhase[];
}

export interface MintPhase {
    Sequence: number;
    Name:string;
    Quantity: number;
    Price: number;
    StartDateTime: string;
    EndDateTime?: string;
}
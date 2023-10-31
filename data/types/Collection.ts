export interface Collection {
    Name: string;
    ContractAddress: string;
    Symbol: string;
    Supply: number;
    Metadata: Metadata;
}

export interface Metadata {
    Banner: string;
    Cover: string;
    Description: string;
    Logo: string;
    Discord: string;
    Twitter: string;
    Telegram: string;
    Email: string;
    Website: string;
    Atlas3: string
}
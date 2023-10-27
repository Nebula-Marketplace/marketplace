export interface Collection {
    Name: string;
    ContractAddress: string;
    Symbol: string;
    Metadata: OffChainMetadata;
}

export interface OffChainMetadata {
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
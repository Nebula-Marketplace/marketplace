export interface Collection {
    Name: string;
    ContractAddress: string;
    Symbol: string;
    metadata: OffChainMetadata;
}

export interface OffChainMetadata {
    banner: string;
    description: string;
    logo: string;
    discord: string;
    twitter: string;
    telegram: string;
    email: string;
    website: string;
}
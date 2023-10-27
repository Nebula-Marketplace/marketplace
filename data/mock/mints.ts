import {Mint, MintPhase} from "@/data/types/Mint";

export const Mints : Mint[] = [
    {
        ContractAddress: "inj123",
        Description: "A5tound Genesis Mint A5tound",
        Denomination: "inj",
        Royalty: 6.5,
        Date: "2023-11-5",
        Phases: [
            {
                Sequence:0,
                Name:"OG Mint",
                Quantity: 3,
                Price: 0.8,
                StartDateTime: "2023-11-5T16:00:00.00",
                EndDateTime:"2023-11-5T17:00:00.00",
            },
            {
                Sequence:1,
                Name:"VIP Mint",
                Quantity: 1,
                Price: 0.95,
                StartDateTime: "2023-11-5T17:00:00.00",
                EndDateTime:"2023-11-5T18:00:00.00",
            },
            {
                Sequence:2,
                Name:"WL Mint",
                Quantity: 2,
                Price: 0.95,
                StartDateTime: "2023-11-5T18:00:00.00",
                EndDateTime:"2023-11-5T19:00:00.00",
            },
            {
                Sequence:3,
                Name:"Public Mint",
                Quantity: 4,
                Price: 1.1,
                StartDateTime: "2023-11-5T19:00:00.00",
                EndDateTime:"",
            }
        ]
    }
]
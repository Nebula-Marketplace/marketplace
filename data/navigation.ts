interface NavigationType {
    id: number;
    name: string;
    dropdown?: {
        id: number;
        name: string;
        path?: string | undefined;
        dropdown?: {
            id: number;
            name: string;
            path: string;
        }[];
    }[];
}

export const navigation: NavigationType[] = [
    {
        id: 1,
        name: "Home"
    },
    {
        id: 2,
        name: "Explore"
    },
    {
        id: 3,
        name: "Activity"
    },
    {
        id: 4,
        name: "Community"
    },

    {
        id: 6,
        name: "Contact",
    },
];

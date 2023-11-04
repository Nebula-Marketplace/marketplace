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
    /*
    {
        id: 1,
        name: "Collections",
        dropdown: [
            {
                id: 1,
                name: "Explore",
                path: "/collections/explore",
            },
            {
                id: 2,
                name: "Upcoming",
                path: "/collections/upcoming",
            },
        ],
    },
    {
        id: 2,
        name: "Activity",
        dropdown: [
            {
                id: 1,
                name: "Recent",
                path: "/activity/recent",
            },
        ],
    },*/
    {
        id: 3,
        name: "Launchpad",
        dropdown: [
            {
                id: 1,
                name: "Launches",
                path: "/launchpad",
            },
            {
                id: 2,
                name: "Apply",
                path: "/launchpad/apply",
            },
        ],
    },
    {
        id: 4,
        name: "Community",
        dropdown: [
            {
                id: 1,
                name: "Contact",
                path: "/contact",
            },
        ],
    },
   
];

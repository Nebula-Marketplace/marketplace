interface Launch {
    id: number;
    img: string;
    icon: string;
    title: string;
    description: string;
    type: number;
    eth?: undefined | number;
    date: string;
    supply: string;
}

export const Launches: Launch[] = [
    {
        id: 1,
        img: "/assets/images/collections/a5tound/cover.jpeg",
        icon: "icon-1",
        title: "A5tound",
        description: "For the community. Ran by the community. Brand , Inspired by Fashion , Music , and the 90s",
        type: 1,
        supply: "200",
        date: "November 5, 2023"
    },
    {
        id: 3,
        img: "/assets/images/collections/hobos/cover.png",
        icon: "icon-1",
        title: "Hobos",
        description: "5,000 Rail Ridin' Hobos who know you're eyeing their bindle.",
        type: 1,
        date: "November 15, 2023",
        supply: "5000"
    },
    {
        id: 4,
        img: "/assets/images/collections/wolves/cover.jpg",
        icon: "icon-1",
        title: "Wolves",
        description: "",
        type: 1,
        date: "TBD",
        supply: "TBD"
    }
];
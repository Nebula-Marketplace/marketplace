interface Launch {
    id: number;
    img: string;
    icon: string;
    title: string;
    description: string;
    type: number;
    eth?: undefined | number;
}

export const Launches: Launch[] = [
    {
        id: 1,
        img: "/assets/images/box-item/card-item-10.jpg",
        icon: "icon-1",
        title: "A5tound",
        description: "Gayle Hicks",
        type: 1,
    }
];
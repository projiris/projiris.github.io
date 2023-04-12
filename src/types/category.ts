export type Category = {
    title: string;
    uri: string;
    image: string;
    id: string;
}

export type Categories = Record<string, Category>
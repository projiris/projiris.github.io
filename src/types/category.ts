export type Category = {
    title: string;
    uri: string;
    image: string;
    id: string;
    articles: string[];
}

export type Categories = Record<string, Category>
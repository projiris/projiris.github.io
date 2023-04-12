export type Article = {
    uri: string;
    title: string;
    subtitle: string;
    id: string;
    categoryId: string;
    image: string;
}

export type Articles = Record<string, Article>
import {Articles, Categories} from "@/types";

export type ArticlesAndCategories = {
    articles: Articles;
    categories: Categories;
}

export type CurrentlyFetching = Record<string, boolean>

export type ArticleTexts = Record<string, string>
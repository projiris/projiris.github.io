import {Article, Category} from "@/types";

export type FooterProps = {
    article: Article;
    category: Category;
    menuVisible: boolean;
    articles: Article[];
}
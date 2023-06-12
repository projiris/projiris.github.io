import {Articles, Article, Category} from "@/types";

export type FooterProps = {
    article: Article;
    category: Category;
    isMenuVisible: boolean;
    articles: Articles;
}
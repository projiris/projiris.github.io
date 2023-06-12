import { Articles, Category} from "@/types";

export type CategoryArticleListProps = {
    category: Category;
    articles: Articles;
    activeCategory: string;
}
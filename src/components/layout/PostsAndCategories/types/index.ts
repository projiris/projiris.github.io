import {Articles, Categories, PanelType} from "@/types";

export type PostsAndCategoriesProps = {
    articles: Articles;
    categories: Categories;
    activeCategoryId?: string;
    activePanel: PanelType;
}
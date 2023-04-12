import {Categories} from "@/types";

export type DisqusCountProps = {
    categories: Categories;
}

export type DisqusThreadProps = {
    articleId: string;
    articleTitle: string;
}
import {Drive} from "@/lib/drive";
import {Article} from "@/types";

export async function fetchArticle(articleId: string): Promise<string> {
    const [getArticleError, article] =
        await Drive.fetchArticle(articleId)
    if (getArticleError) {
        throw getArticleError
    }
    return article as string
    // setCategoriesAndArticles({ categories, articles })
}
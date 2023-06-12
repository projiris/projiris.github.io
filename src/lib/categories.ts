import {Drive} from "@/lib/drive";
import {DRIVE_DASHBOARD_ID} from "@/constants";
import {ArticlesAndCategories} from "@/hooks/types";

export async function fetchCategories() {
    const [getCategoriesAndArticlesError, response] =
        await Drive.fetchCategories(DRIVE_DASHBOARD_ID)
    if (getCategoriesAndArticlesError) {
        throw getCategoriesAndArticlesError
    }
    return response as ArticlesAndCategories
    // setCategoriesAndArticles({ categories, articles })
}
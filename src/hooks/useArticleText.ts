import { useEffect, useState } from 'react'
import { Drive } from '@/lib/drive'
import {ArticleTexts, CurrentlyFetching} from "@/hooks/types";
/*
export const useArticleText = (articleId) => {
    const [isFetching, setIsFetching] = useState<CurrentlyFetching>({})
    const [texts, setTexts] = useState<ArticleTexts>({})

    const article = texts?.[articleId] ?? ''
    const isFetchingArticle = isFetching?.[articleId]

    useEffect(() => {
        if (!texts?.[articleId] && !isFetchingArticle) {
            setIsFetching({
                ...isFetching,
                [articleId]: true,
            });
            (async () => {
                const [fetchArticleError, articleHtml] = await Drive.fetchArticle(
                    articleId
                )
                if (fetchArticleError) {
                    throw new Error(fetchArticleError)
                }
                setIsFetching({
                    ...isFetching,
                    [articleId]: false,
                })
                setTexts({
                    ...texts,
                    [articleId]: articleHtml,
                })
                document.getElementById('article-header')?.scrollIntoView()
            })();
        }
    }, [articleId, texts, isFetchingArticle])
    return article
}
*/
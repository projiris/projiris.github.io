'use client';
import { useState, useEffect } from 'react'
import { Drive } from '@/lib/drive'
import {DRIVE_DASHBOARD_ID} from "@/constants";
import {ArticlesAndCategories} from "@/hooks/types";

export const useCategoriesAndArticles = () => {
    const [categoriesAndArticles, setCategoriesAndArticles] = useState<ArticlesAndCategories>({
        categories: {},
        articles: {},
    })

    useEffect(() => {
        (async() => {
            const [getCategoriesAndArticlesError, response] =
                await Drive.fetchCategories(DRIVE_DASHBOARD_ID)
            if (getCategoriesAndArticlesError) {
                throw new Error(getCategoriesAndArticlesError)
            }
            const { categories, articles } = response
            setCategoriesAndArticles({ categories, articles })
        })()

    }, [])

    return categoriesAndArticles
}

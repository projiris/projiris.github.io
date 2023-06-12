'use client'
import styles from './categoryList.module.css'
import {FunctionComponent, useEffect, useState, MouseEvent} from "react";
import {CategoryListProps} from "./types";
import {CategoryArticlesList} from "@/components/layout/Menu/CategoryArticlesList";

export const CategoryList: FunctionComponent<CategoryListProps> = ({categories, articles}) => {
    const [activeCategory, setActiveCategory] = useState<string>('')
    const toggleCategory = (event: MouseEvent<HTMLElement>) => {
        const category = event.currentTarget.dataset.category as string
        setActiveCategory(category !== activeCategory ? category : '')
    }

    useEffect(() => {
        setActiveCategory(Object.values(categories || {})?.[0]?.id ?? '')
    }, [categories])

    if(!categories || !Object.values(categories).length) {
        return null
    }

    return <ul className={styles.menuList}>
        {Object.values(categories).map(
            (category, index) =>
                <li key={category.id}>
                    <i className={'fas fa-angle-right ' + styles.icon} />
                    <button
                        title={category.title}
                        onClick={toggleCategory}
                        className={styles.itemLink}
                        data-category={category.id}
                    >
                        {category.title}
                    </button>
                    <CategoryArticlesList category={category} articles={articles} activeCategory={activeCategory} />
                </li>

        )}
    </ul>
}
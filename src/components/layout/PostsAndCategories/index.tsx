import React, {FunctionComponent} from "react";
import {DisqusCount} from '@/components/disqus/disqusCount'
import {Article as ArticleBlock} from '@/components/blocks/Article'
import {Category as CategoryBlock} from '@/components/blocks/Category'
//import { getActiveItemId } from '@/utils/path.js'
import {useCategoriesAndArticles} from '@/hooks/useCategoriesAndArticles'
import {useActivePanel} from '@/hooks/useActivePanel'
import styles from "./styles.module.css"
import blockStyles from '@/styles/blocks.module.css'
import cn from "classnames";
import {Panels, PanelType} from "@/types/panels";
import {PostsAndCategoriesProps} from "./types";
import Link from "next/link";

export const PostsAndCategories: FunctionComponent<PostsAndCategoriesProps> = ({
                                                                                   articles,
                                                                                   categories,
                                                                                   activeCategoryId = '',
                                                                                    activePanel = Panels.POSTS,
                                                                               }) => {

    // const { categories, articles } = useCategoriesAndArticles()
    //activeCategoryId = activeCategoryId || Object.keys(categories)[0]
    //const {activeItemId: activeCategoryId} = usePath()
    //const activeCategoryId = state?.activeItemId ?? getActiveItemId()


    /*
    const handleSelectPanel = (event: React.MouseEvent<HTMLElement>) => {
        const selectedPanel = event.currentTarget.dataset.panel as PanelType
        setActivePanel(selectedPanel)
    }
    */
    return (
        <>
            <div className={styles.togglePostsCategory}>
                <Link
                    className={cn(styles.togglePanel, activePanel === Panels.POSTS && styles.buttonActive)}
                    href={Panels.POSTS}
                    data-panel={Panels.POSTS}
                >
                    Posts
                </Link>
                <Link
                    className={cn(styles.togglePanel, activePanel === Panels.CATEGORIES && styles.buttonActive)}
                    href={Panels.CATEGORIES}
                    data-panel={Panels.CATEGORIES}
                >
                    Categories
                </Link>
            </div>
            <div
                className={cn(styles.list, styles.postsOrCategories, activePanel === Panels.POSTS ? blockStyles.fadeIn : styles.hide)}
            >
                {Object.values(articles)
                    .filter(
                        (article) =>
                            !activeCategoryId ||
                            article.categoryId === activeCategoryId
                    )
                    .map(
                        (article) => <ArticleBlock
                            key={article.id}
                            article={article}
                            category={categories[article.categoryId]}
                        />
                    )}
            </div>
            <div
                className={cn(styles.list, styles.postsOrCategories, activePanel === Panels.CATEGORIES ? blockStyles.fadeIn : styles.hide)}
            >
                {Object.values(categories).map(
                    (category) => <CategoryBlock
                        key={category.id}
                        category={category}
                    />
                )}
            </div>
            <DisqusCount categories={categories}/>
        </>)
}
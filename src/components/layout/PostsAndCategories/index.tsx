import {FunctionComponent} from "react";
import {DisqusCount} from '@/components/disqus/disqusCount'
import {Article as ArticleBlock} from '@/components/blocks/Article'
import {Category as CategoryBlock} from '@/components/blocks/Category'
//import { getActiveItemId } from '@/utils/path.js'
import {useCategoriesAndArticles} from '@/hooks/useCategoriesAndArticles'
import {useActivePanel} from '@/hooks/useActivePanel'
import styles from "./styles.module.css"
import blockStyles from '@/styles/blocks.module.css'
import cn from "classnames";
import {Panels} from "@/types/panels";
import {PostsAndCategoriesProps} from "./types";


export const PostsAndCategories: FunctionComponent<PostsAndCategoriesProps> = ({activeCategoryId = ''}) => {

    const { categories, articles } = useCategoriesAndArticles()
    //activeCategoryId = activeCategoryId || Object.keys(categories)[0]
    //const {activeItemId: activeCategoryId} = usePath()
    //const activeCategoryId = state?.activeItemId ?? getActiveItemId()

    const { activePanel, setActivePanel } = useActivePanel()
    const handleSelectPanel = (event) => {
        const selectedPanel = event.target.dataset.panel
        setActivePanel(selectedPanel)
    }

    return (
        <>
            <div className={styles.togglePostsCategory}>
                <button
                    className={cn(styles.togglePanel, activePanel === Panels.POSTS && styles.buttonActive)}
                    onClick={handleSelectPanel}
                    data-panel={Panels.POSTS}
                >
                    Posts
                </button>
                <button
                    className={cn(styles.togglePanel, activePanel === Panels.CATEGORIES && styles.buttonActive)}
                    onClick={handleSelectPanel}
                    data-panel={Panels.CATEGORIES}
                >
                    Categories
                </button>
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
                            setActivePanel={setActivePanel}
                        />
        )}
        </div>
        <DisqusCount categories={categories} />
    </>)
}
'use client';
// import { useRouter} from "next/router";
import cn from "classnames";
import { MenuBurger } from "@/components/layout/Menu/MenuBurger";
import { Menu} from "@/components/layout/Menu";
import { DisqusThread } from "@/components/disqus/disqusThread";
import { Footer } from "@/components/layout/Footer";
import {useCategoriesAndArticles} from "@/hooks/useCategoriesAndArticles";
import {useArticleText} from "@/hooks/useArticleText";
import {useMenuVisible} from "@/hooks/useMenuVisible";
import {usePageMeta} from "@/hooks/usePageMeta";
import {Article} from "@/types";
// import {usePath} from "@/hooks/usePath";
import blockStyles from '@/styles/blocks.module.css'
import styles from './article.module.css'

export default function Page({params}) {
    console.log('params', params)
    const {articleId: activeArticleId, slug} = params
    const { articles, categories } = useCategoriesAndArticles()
    // const {activeArticleId} = usePath()
    console.log('active article id', activeArticleId)
    const activeArticle: Article = articles?.[activeArticleId] ?? {
        uri: '',
        title: '',
        subtitle: '',
        id: '',
        image: '',
        categoryId: ''
    }
    const activeText = useArticleText(activeArticleId)
    const category = categories?.[activeArticle?.categoryId]

    const title = activeArticle.title
    const subtitle = activeArticle.subtitle
    const { menuVisible, toggleMenuVisible } = useMenuVisible()
    usePageMeta(title, subtitle)

    return (<div className={cn(blockStyles.wrapper, styles.page)}>
        <MenuBurger toggleMenuVisible={toggleMenuVisible} />
        <Menu
          menuVisible={menuVisible}
          articles={articles}
          categories={categories}
        />
        <main className={cn(blockStyles.wrapper, styles.article, menuVisible && styles.mainNarrow)}>
            <header
                className={styles.hero}
                role="banner"
                style={{
                backgroundImage: `url(${activeArticle?.image})`,
            }}
                id="article-header"
            />
            <section
                className={cn(blockStyles.block, styles.articleContent, menuVisible && styles.contentNarrow)}
            >
                <h1 id="article-title" className={styles.title}>
                    {activeArticle?.title}
                </h1>
                <p>{activeArticle?.subtitle}</p>
                <div
                    dangerouslySetInnerHTML={{__html: activeText}}
                />
                <DisqusThread
                  articleId={activeArticle.id}
                  articleTitle={activeArticle.title}
                />
            </section>
            <Footer
              article={activeArticle}
              articles={articles}
              category={category}
              menuVisible={menuVisible}
            />
        </main>
    </div>)
}
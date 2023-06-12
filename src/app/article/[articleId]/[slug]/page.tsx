import cn from "classnames";
import { MenuBurger } from "@/components/layout/Menu/MenuBurger";
import { Menu} from "@/components/layout/Menu";
import { DisqusThread } from "@/components/disqus/disqusThread";
import { Footer } from "@/components/layout/Footer";
import {Article} from "@/types";
import blockStyles from '@/styles/blocks.module.css'
import styles from './article.module.css'
import {fetchCategories} from "@/lib/categories";
import {fetchArticle} from "@/lib/article";
interface ArticlePageParams {
    articleId: string;
    slug: string;
}

export default async function ArticlePage({params}: { params: ArticlePageParams }) {
    const {articleId: activeArticleId, slug} = params
    const { categories, articles } = await fetchCategories()

    const activeText = await fetchArticle(activeArticleId);

    const activeArticle: Article = articles?.[activeArticleId] ?? {
        uri: '',
        title: '',
        subtitle: '',
        id: '',
        image: '',
        categoryId: ''
    }
    //const activeText = useArticleText(activeArticleId)
    const category = categories?.[activeArticle?.categoryId]

    const title = activeArticle.title
    const subtitle = activeArticle.subtitle
    //const { menuVisible, toggleMenuVisible } = useMenuVisible()
    const isMenuVisible = true
    //usePageMeta(title, subtitle)

    return (<div className={cn(blockStyles.wrapper, styles.page)}>
        <MenuBurger />
        <Menu
          menuVisible={isMenuVisible}
          articles={articles}
          categories={categories}
        />
        <main className={cn(blockStyles.wrapper, styles.article, isMenuVisible && styles.mainNarrow)}>
            <header
                className={styles.hero}
                role="banner"
                style={{
                backgroundImage: `url(${activeArticle?.image})`,
            }}
                id="article-header"
            />
            <section
                className={cn(blockStyles.block, styles.articleContent, isMenuVisible && styles.contentNarrow)}
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
              isMenuVisible={isMenuVisible}
            />
        </main>
    </div>)
}
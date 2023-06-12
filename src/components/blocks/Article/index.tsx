import React, {FunctionComponent} from 'react'
import Link from 'next/link'
import articleStyles from './article.module.css'
import {ArticleProps} from "@/components/blocks/Article/types";
import cn from "classnames";

export const Article: FunctionComponent<ArticleProps> = ({article, category}) => {
    return (
        <article className={articleStyles.article}>
            <h2 className={articleStyles.titleContainer}>
                <Link
                    href={article.uri}
                    title={article.title}
                    className={articleStyles.title}
                >
                    {article.title}
                </Link>
            </h2>
            <p className={cn(articleStyles.para, articleStyles.description)}>{article.subtitle}</p>
            <p className={cn(articleStyles.para, articleStyles.meta)}>
            <span
                title={'Comments for ' + article.title}
                data-disqus-url={'http://localhost:3000/' +
                article.uri}
                data-disqus-identifier={article.id}
                className="disqus-comment-count"
            />
                - Published in :
                <Link
                    title={category.title}
                    href={category.uri}
                    className={articleStyles.category}
                >
                    {category.title}
                </Link>
            </p>
        </article>
    )
}

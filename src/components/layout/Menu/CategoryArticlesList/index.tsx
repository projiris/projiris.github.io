import styles from './categoryArticlesList.module.css'
import {FunctionComponent} from "react";
import {CategoryArticleListProps} from "./types";
import Link from "next/link";
import cn from "classnames";

export const CategoryArticlesList: FunctionComponent<CategoryArticleListProps> = ({category, articles, activeCategory}) => {

    // const router = useRouter();
    // const { isMenuVisible } = router.query;
    return <ul className={styles.subList}>
        {Object.values(articles)
            .filter(
                (article) =>
                    article.categoryId === category.id
            )
            .map(
                (article) =>
                    <li
                        key={article.id}
                        className={cn(styles.subItem, (category.id ===
                            activeCategory) && styles.subItemExpanded)}
                    >
                        <Link
                            key={article.id}
                            title={article.title}
                            href={article.uri}
                            className={styles.subItemLink}
                            //onClick={avoidReload}
                        >
                            {article.title}
                        </Link>
                    </li>

            )}
    </ul>
}
'use client';
import {FunctionComponent, useEffect, useState} from 'react'
import cn from 'classnames'
import Link from 'next/link';
import styles from './menu.module.css'
import {MenuProps} from "./types";

// import { avoidReload } from '../../utils/avoidReload.js'
// import prefixUriIfNeeded from '../../utils/prefixUriIfNeeded.js'

export const Menu: FunctionComponent<MenuProps> = ({ categories, articles, menuVisible }) => {
    const [activeCategory, setActiveCategory] = useState<string>('')
    const toggleCategory = (event) => {
        const category = event.target.dataset.category
        setActiveCategory(category !== activeCategory ? category : '')
    }
    useEffect(() => {
        setActiveCategory(Object.values(categories)?.[0]?.id ?? '')
    }, [categories])
    return <nav id="menu" className={cn(styles.menu, menuVisible && styles.menuOpen)}>
            <ul className={styles.menuList}>
                <li className={styles.item}>
                    <i className={'fas fa-home ' + styles.icon} />
                    <Link
                        href='/'
                        title="Home"
                        className={styles.itemLink}
                        //onClick={avoidReload}
                    >
                        Home
                    </Link>
                </li>
                <li className={styles.item}>
                    <i className={'fas fa-user ' + styles.icon} />
                    <Link
                        href='/about'
                        title="About"
                        className={styles.itemLink}
                        //onClick=${avoidReload}
                    >
                        About
                    </Link>
                </li>
                <li className={styles.item}>
                    <i className={'fas fa-paper-plane ' + styles.icon} />
                    <Link
                        href='/contact'
                        title="Contact"
                        className={styles.itemLink}
                        //onClick={avoidReload}
                    >
                        Contact
                    </Link>
                </li>
            </ul>
            <hr className={styles.separator} />
            <ul className={styles.menuList}>
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

                            <ul className={styles.subList}>
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
                        </li>

    )}
            </ul>
        </nav>
}

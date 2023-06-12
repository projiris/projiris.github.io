import {FunctionComponent, useEffect, useState} from 'react'
import cn from 'classnames'
import Link from 'next/link';
import styles from './menu.module.css'
import {MenuProps} from "./types";
//import { useRouter } from "next/navigation";
import {CategoryArticlesList} from "./CategoryArticlesList";
import {CategoryList} from "@/components/layout/Menu/CategoryList";

// import { avoidReload } from '../../utils/avoidReload.js'
// import prefixUriIfNeeded from '../../utils/prefixUriIfNeeded.js'

function getActiveCategoryFromPathname(pathname: string): string {
    return pathname.split('/categories/')[1]
}

export const Menu: FunctionComponent<MenuProps> = ({ categories, articles, menuVisible }) => {
    // const router = useRouter();
    //const pathname = useRouter()
    //const activeCategory = getActiveCategoryFromPathname(pathname)
    /*
    const [activeCategory, setActiveCategory] = useState<string>('')
    const toggleCategory = (event) => {
        const category = event.target.dataset.category
        setActiveCategory(category !== activeCategory ? category : '')
    }
    useEffect(() => {
        setActiveCategory(Object.values(categories)?.[0]?.id ?? '')
    }, [categories])
    */
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
            <CategoryList categories={categories} articles={articles} />
        </nav>
}

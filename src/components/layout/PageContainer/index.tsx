'use client';
import {FunctionComponent} from "react";
import cn from "classnames";
import { Menu } from '../Menu'
import { Sidebar } from '../Sidebar'
//import { buttonsStyles } from '../../styles/buttons.js'
import blocksStyles from '@/styles/blocks.module.css'
import { MenuBurger } from '../Menu/MenuBurger'
import { useCategoriesAndArticles } from '@/hooks/useCategoriesAndArticles'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useMenuVisible } from '@/hooks/useMenuVisible'
import styles from './page.module.css'
import {PageProps} from "./types";

export const PageContainer: FunctionComponent<PageProps> = ({
                         title,
                         subtitle = '',
                         description =  '',
                         sidebarImage,
                         showLinks = false,
                         children,
                     }) => {
    const { categories, articles } = useCategoriesAndArticles()
    const { menuVisible, toggleMenuVisible } = useMenuVisible()

    usePageMeta(title, subtitle)

    return <div className={styles.page}>
            <MenuBurger toggleMenuVisible={toggleMenuVisible} />
            <Menu
                articles={articles}
                categories={categories}
                menuVisible={menuVisible}
            />
            <main
                className={cn(styles.pageMain, menuVisible && styles.mainNarrow) + ' blocks-fadein'}
            >
                <Sidebar
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    sidebarImage={sidebarImage}
                    menuVisible={menuVisible}
                    showLinks={showLinks}
                />
                <section
                    className={cn(styles.pageContent, menuVisible && styles.contentNarrow)}
                >
                    {children}
                </section>
            </main>
        </div>
}

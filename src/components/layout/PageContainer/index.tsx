import {FunctionComponent} from "react";
import cn from "classnames";
import { Menu } from '../Menu'
import { Sidebar } from '../Sidebar'
//import { buttonsStyles } from '../../styles/buttons.js'
import blocksStyles from '@/styles/blocks.module.css'
import { MenuBurger } from '../Menu/MenuBurger'
import { useCategoriesAndArticles } from '@/hooks/useCategoriesAndArticles'
// import { usePageMeta } from '@/hooks/usePageMeta'
import { useMenuVisible } from '@/hooks/useMenuVisible'
import styles from './page.module.css'
import {PageProps} from "./types";
const noop = (isMenuVisible: boolean) => {}

export const PageContainer: FunctionComponent<PageProps> = ({
                        articles,
                        categories,
                         title,
                         subtitle = '',
                         description =  '',
                         sidebarImage,
                         showLinks = false,
                        isMenuVisible = true,
                         children,
                     }) => {
    // const { categories, articles } = useCategoriesAndArticles()
    // const { menuVisible, toggleMenuVisible } = useMenuVisible()

    //usePageMeta(title, subtitle)

    return <div className={styles.page}>
            <MenuBurger />
            <Menu
                articles={articles}
                categories={categories}
                menuVisible={isMenuVisible}
            />
            <main
                className={cn(styles.pageMain, isMenuVisible && styles.mainNarrow) + ' blocks-fadein'}
            >
                <Sidebar
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    sidebarImage={sidebarImage}
                    menuVisible={isMenuVisible}
                    showLinks={showLinks}
                />
                <section
                    className={cn(styles.pageContent, isMenuVisible && styles.contentNarrow)}
                >
                    {children}
                </section>
            </main>
        </div>
}

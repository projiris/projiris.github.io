import {FunctionComponent} from "react";
import cn from "classnames";
import {SidebarProps} from "./types";
import styles from './sidebar.module.css'

export const Sidebar: FunctionComponent<SidebarProps> = ({
                                                             title,
                                                             subtitle,
                                                             description,
                                                             sidebarImage,
                                                             menuVisible,
                                                             showLinks = false,
                                                         }) => {
    return (<aside
        className={cn(styles.sidebar, menuVisible && styles.sidebarNarrow)}
        style={{backgroundImage: `url(${sidebarImage})`}}
    >
        <div className={styles.info}>
            <div className={styles.primary}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <p>{description}</p>
            </div>
            <div className={cn(styles.links, showLinks && styles.showLinks)}>
                <a
                    className={styles.button}
                    href="https://docs.google.com/spreadsheets/d/1LPPZQpxeVzImJ6vSbN9YmEfOKrcheDzbJD2Q3PlConY/edit?usp=sharing"
                    target="_blank"
                >
                    Outil Macro-planning
                </a>
                <a
                    className={styles.button}
                    href="https://github.com/projiris/projiris.github.io"
                    target="_blank"
                >
                    Source on GitHub
                </a>
            </div>
        </div>
    </aside>)
}
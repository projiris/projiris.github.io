import styles from './menuBurger.module.css'
import {FunctionComponent} from "react";
import {MenuBurgerProps} from "./types";

export const MenuBurger: FunctionComponent<MenuBurgerProps> = ({ toggleMenuVisible }) => {
    return <button className={styles.menuBurger} onClick={toggleMenuVisible}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
        </button>
}

'use client'
import styles from './menuBurger.module.css'
import {FunctionComponent} from "react";
import {MenuBurgerProps} from "./types";
import Link from "next/link";
import { usePathname, useParams } from 'next/navigation';
// import {useRouter} from "next/navigation";

export const MenuBurger: FunctionComponent<MenuBurgerProps> = () => {
    const pathname = usePathname();
    const { isMenuVisible} = useParams()

    // const router = useRouter();
    // const { isMenuVisible } = router.query;
    return <Link className={styles.menuBurger} href={{
                pathname,
                query: { isMenuVisible: !isMenuVisible},
            }}>
            <div className={styles.bar} />
            <div className={styles.bar} />
            <div className={styles.bar} />
        </Link>
}

import styles from './spinner.module.css'
import {FunctionComponent} from "react";
import {SpinnerProps} from "./types";

export const Spinner: FunctionComponent<SpinnerProps> = ({ width, height, rayon = 45 }) => {
    return <svg
            className={styles.spinner}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
        >
            <circle className={styles.circle} cx="50" cy="50" r={rayon} />
        </svg>
}

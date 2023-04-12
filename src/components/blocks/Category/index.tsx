import React, {FunctionComponent} from 'react'
import Link from 'next/link'
import categoryStyles from './category.module.css'
import {CategoryProps} from "@/components/blocks/Category/types";
import {Panels} from "@/types/panels";

export const Category: FunctionComponent<CategoryProps> = ({category, setActivePanel}) => {

    return (
        <Link
            href={category.uri}
            className={categoryStyles.categoryBlock}
            style={{
                backgroundImage: `url(${category.image})`,
            }}
            onClick={(event) => {
                setActivePanel(Panels.POSTS)
            }}
        >
            <h2 className={categoryStyles.title + " title"} title={category.title}>{category.title}</h2>
        </Link>
    )
}
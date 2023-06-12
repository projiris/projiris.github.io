import React from "react"
import {Articles, Categories} from "@/types";

export type PageProps = {
    articles: Articles;
    categories: Categories;
    title: string;
    subtitle?: string;
    description?: string;
    sidebarImage: string;
    showLinks?: boolean;
    isMenuVisible?: boolean;
    children: React.ReactNode;
}
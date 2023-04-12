'use client';
import { useEffect } from 'react'
import {SITE_NAME, SITE_SUBTITLE} from "@/constants";

export const usePageMeta = (title?: string, subtitle?: string) => {
    useEffect(() => {
        document.title = title
            ? `${title} - ${SITE_NAME}`
            : SITE_NAME
    }, [title])

    useEffect(() => {
        document
            ?.querySelector('meta[name="description"]')
            ?.setAttribute('content', subtitle ? subtitle : SITE_SUBTITLE )
    }, [subtitle])
}

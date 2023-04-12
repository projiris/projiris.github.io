import {useMemo} from "react";
import { usePathname } from 'next/navigation';

export const usePath = () => {
    const pathname = usePathname()
    console.log('pathname', pathname)

    const pathParts = useMemo((): string[] => {
        return pathname.split('/')
    }, [pathname])

    const pageName = useMemo((): string => {
        return pathParts[1]
    }, [pathParts])

    const activeItemId = useMemo(() => {
        return pathParts[2]
    }, [pathParts])

    return {pathParts, pageName, activeItemId}
}

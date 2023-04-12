'use client';
import { useState } from 'react'

export const useMenuVisible = () => {
    const [menuVisible, setMenuVisible] = useState<boolean>(
        !(typeof window !== 'undefined' && window.innerWidth < 769)
    )
    const toggleMenuVisible = () => {
        setMenuVisible(!menuVisible)
    }
    return { menuVisible, toggleMenuVisible }
}

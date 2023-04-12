import {useState} from 'react'
import {Panels, PanelType} from "@/types/panels";

export const useActivePanel = () => {
    const [activePanel, setActivePanel] = useState<PanelType>(Panels.POSTS)
    return { activePanel, setActivePanel }
}

'use client'
import {FunctionComponent, useEffect, useState} from 'react'
import { to } from '@/utils/to'
import {DISQUS_SHORTNAME} from "@/constants";
import {DisqusCountProps} from "./types";

const DISQUS_COUNT_URL = `https://${DISQUS_SHORTNAME}.disqus.com/count.js`

export const DisqusCount: FunctionComponent<DisqusCountProps> = ({ categories }) => {
    const [disqusCountScript, setDisqusCountScript] = useState(null)

    const loadDisqusCountScript = async () => {
        const [loadError, loadedScript] = await to(
            new Promise(function (resolve, reject) {
                const head = document.getElementsByTagName('head')[0]
                const script = document.createElement('script')

                script.type = 'text/javascript'
                script.addEventListener('load', function (scriptData) {
                    resolve(scriptData)
                })
                script.defer = true
                script.className = 'disqus-count-script'
                script.src = DISQUS_COUNT_URL
                head.appendChild(script)
            })
        )
        if (loadError) {
            console.log('failed loading disqus count script', loadError)
        } else {
            setDisqusCountScript(loadedScript)
        }
    }
    const removeDisqusCountScript = () => {
        // @ts-ignore
        if (disqusCountScript && disqusCountScript.parentNode) {
            // @ts-ignore
            disqusCountScript.parentNode.removeChild(disqusCountScript)
            setDisqusCountScript(null)
        }
    }

    useEffect(() => {
        (async() => {
            // @ts-ignore
            window.disqus_shortname = DISQUS_SHORTNAME
            // @ts-ignore
            if (typeof window.DISQUSWIDGETS !== 'undefined') {
                // @ts-ignore
                window.DISQUSWIDGETS = undefined
            }
            if (Object.values(categories).length) {
                await loadDisqusCountScript()
            }
        })()

        return removeDisqusCountScript
    }, [categories])

    return (<span id="disqus-comments-count" />)
}

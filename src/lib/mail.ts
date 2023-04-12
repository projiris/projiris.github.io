import { Api } from './api'
import jsonpCall from '@/utils/jsonpCall'
import { to } from '@/utils/to'

import { APPS_SCRIPT_BASE_URL, IP_INFO_URL, IP_INFO_TOKEN } from '@/constants'

export const Mail = {
    ...Api,
    async getIpInfo() {
        return await to(
            new Promise((resolve, reject) => {
                try {
                    jsonpCall(`${IP_INFO_URL}${IP_INFO_TOKEN}`, (ipInfo) =>
                        resolve(ipInfo)
                    )
                } catch (error) {
                    reject(error)
                }
            })
        )
    },
    async send(form) {
        const [ipError, ipInfo] = await this.getIpInfo()
        if (ipError) {
            return [ipError]
        }
        const message = {
            ...form,
            ip: ipInfo?.ip,
            location: ipInfo?.city + ' - ' + ipInfo?.country,
        }
        const queryParams = Object.keys(message)
            .map(
                (property) =>
                    `${property}=${encodeURIComponent(message[property])}`
            )
            .join('&')

        return await to(
            new Promise((resolve, reject) => {
                try {
                    jsonpCall(APPS_SCRIPT_BASE_URL + queryParams, (response) =>
                        resolve(response)
                    )
                } catch (error) {
                    reject(error)
                }
            })
        )
    },
}

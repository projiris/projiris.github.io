import { Api } from './api'
import { to } from '@/utils/to'

import {GOOGLE_API_KEY, DRIVE_EXPORT_URL} from "@/constants";
import {Article, Articles, Categories, Category} from "@/types";
import {ArticlesAndCategories} from "@/hooks/types";
import {SpreadsheetResponse} from "@/lib/types";

export const Drive = {
    ...Api,
    driveExportUrl: DRIVE_EXPORT_URL,
    isFetchingCategories: false,

    async getSpreadsheet(fileId: string): Promise<[null | Error, SpreadsheetResponse?]> {
        return await to(
            this.get(
                `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/Posts?alt=json&key=${GOOGLE_API_KEY}`,
                {
                    credentials: 'omit',
                }
            ).then((response) => (response.json() as Promise<SpreadsheetResponse>))
        )
    },

    async getDocument(fileId: string) {
        return await to(
            this.get(
                `https://docs.google.com/feeds/download/documents/export/Export?id=${fileId}&exportFormat=html`,
                {
                    credentials: 'omit',
                }
            ).then((response) => {
                return response.text()
            })
        )
    },

    async fetchCategories(dashboardId: string): Promise<[Error | null, ArticlesAndCategories?]> {
        const [getSpreadsheetError, spreadsheet] = await this.getSpreadsheet(
            dashboardId
        )
        if (getSpreadsheetError) {
            console.log('getSpreadsheetError', getSpreadsheetError)
            return [getSpreadsheetError]
        }
        const rows = (spreadsheet as SpreadsheetResponse).values
        rows.shift()

        const categories = {} as Categories
        const articles = {} as Articles
        rows.forEach((row) => {
            const articleId = row?.[4]
            articles[articleId] = {
                id: row?.[4],
                title: row?.[0],
                subtitle: row?.[1],
                imageName: row?.[3],
                image: this.driveExportUrl + row?.[5],
                category: row?.[2],
                categoryId: this.slug(row?.[2], 'category'),
                lastUpdated: row?.[6],
                date: this.formatDate(row?.[6]),
                uri: `/article/${row?.[4]}/${this.slug(row?.[0], 'article')}`,
            } as Article
            const categoryId = articles[articleId]?.categoryId
            const isExistingCategory = Object.values(categories).some(
                (category) => category.id === categoryId
            )
            if (isExistingCategory) {
                categories[categoryId].articles.push(row?.[4])
            } else {
                categories[categoryId] = {
                    id: categoryId,
                    title: row?.[2],
                    imageName: row?.[3],
                    image: articles[articleId]?.image,
                    articles: [row?.[4]],
                    uri: `/category/${categoryId}`,
                } as Category
            }
        })
        return [
            null,
            {
                articles,
                categories,
            },
        ]
    },

    async fetchArticle(articleId: string) {
        const [getDocumentError, doc] = await this.getDocument(articleId)
        if (getDocumentError) {
            console.log('getDocumentError', getDocumentError)
            return [getDocumentError]
        }
        console.log('got doc', doc)
        let styleStart = '<style type="text/css">'
        let styleEnd = '</style>'
        let splitStyleStart = doc.split(styleStart)
        let splitStyleEnd = splitStyleStart[1].split(styleEnd)

        let htmlStart = '<body '
        let htmlStart2 = '>'
        let htmlEnd = '</body>'
        let splitHtmlStart = splitStyleEnd[1].split(htmlStart)
        let splitHtmlStart2 = splitHtmlStart[1].split(htmlStart2)
        let htmlClass = splitHtmlStart2[0]
        let htmlStartFull = htmlStart + htmlClass + htmlStart2
        splitHtmlStart = splitStyleEnd[1].split(htmlStartFull)
        let splitHtmlEnd = splitHtmlStart[1].split(htmlEnd)

        return [
            null,
            `${styleStart}
        ${splitStyleEnd[0]}
        ${styleEnd}
        <div>${splitHtmlEnd[0]}</div>
        `,
        ]
    },

    slug(str: string, type = 'type'): string {
        str = str.replace(/^\s+|\s+$/g, '')
        str = str.toLowerCase()

        let from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
        let to = 'aaaaaeeeeeiiiiooooouuuunc------'
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
        }

        str = str
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')

        if (str.length < 4) {
            str = type + '_' + str
        }
        return str
    },

    formatDate(lastUpdated: string):string {
        const fullDateSplit = lastUpdated.split(' ')
        const dateSplit = fullDateSplit[0].split('/')
        const day = parseInt(dateSplit[0])
        const month = parseInt(dateSplit[1])
        const year = dateSplit[2]
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        let daySuffix = 'th'
        switch (day) {
            case 1:
                daySuffix = 'st'
                break
            case 2:
                daySuffix = 'nd'
                break
            case 3:
                daySuffix = 'rd'
                break
        }
        return `${day}${daySuffix} of ${monthNames[month - 1]}`
    },
}

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Projiris',
  description: 'Project management and risk analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <meta name="description" content="Project management and risk analysis" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/solid.css"
              integrity="sha384-r/k8YTFqmlOaqRkZuSiE9trsrDXkh07mRaoGBMoDcmA58OHILZPsk29i2BsFng1B"
              crossOrigin="anonymous"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/fontawesome.css"
              integrity="sha384-4aon80D8rXCGx9ayDt85LbyUHeMWd3UiBaWliBlJ53yzm9hqN21A+o1pqoyK04h+"
              crossOrigin="anonymous"/>
        <title>Projiris</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

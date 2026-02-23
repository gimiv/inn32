import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../index.css'
import { ThemeProvider } from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { websiteData } from '../data/website-data'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
    title: {
        template: `%s | ${websiteData.property.name}`,
        default: websiteData.property.name,
    },
    description: websiteData.property.description,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const themeConfig = websiteData.websiteConfig

    const inlineStyles = `
        :root {
            --color-primary: ${themeConfig.primaryColor};
            --color-secondary: ${themeConfig.secondaryColor};
            --color-accent: ${themeConfig.primaryColor};
        }
    `

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/inn32-favicon-32.png" type="image/png" sizes="32x32" />
                <link rel="icon" href="/inn32-favicon-16.png" type="image/png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
                <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-gray-900 bg-white dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300`}>
                {/* Mews Booking Engine */}
                <Script
                    src="https://app.mews.com/distributor/distributor.min.js"
                    strategy="afterInteractive"
                />
                <ThemeProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navigation />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}

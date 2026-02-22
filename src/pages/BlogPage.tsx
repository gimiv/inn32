import { useEffect } from 'react'
import Blog from '../components/Blog'
import SEO from '../components/SEO'

export default function BlogPage() {
    // Note: If we want to implement category filtering on the full blog page later, 
    // we can use these. For now, Blog component might handle it or just list all.
    // The previous code had category logic but the Blog component itself might be self-contained 
    // or we might render the list here. 
    // Given the previous code just rendered <Blog />, I'll stick to that structure but keep the page clean.

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SEO
                title="Inn 32 Blog - Latest News & Guides"
                description="Read our latest travel guides, hotel updates, and local tips for visiting the White Mountains."
            />

            <main className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <Blog />
            </main>
        </>
    )
}

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <ThemeProviderInner>{children}</ThemeProviderInner>
        </NextThemesProvider>
    )
}

function ThemeProviderInner({ children }: { children: React.ReactNode }) {
    const { theme: nextTheme, setTheme } = useNextTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const theme = (nextTheme as Theme) || 'light'

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // Wrap children but avoiding hidden flash if we don't strictly need to.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

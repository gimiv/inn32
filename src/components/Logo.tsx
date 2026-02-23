'use client'

import { useTheme } from '../context/ThemeContext'

interface LogoProps {
    className?: string;
    variant?: 'color' | 'white';
    isScrolled?: boolean;
}

export default function Logo({ className = "", isScrolled = false, variant }: LogoProps) {
    const { theme } = useTheme();

    // If we are scrolled down in Light Mode, we want the Dark logo
    // If we are scrolled down in Dark Mode, we want the Light logo
    // If we are at the top (transparent header), we want the Light logo because the hero image is dark

    let logoSrc = '/inn32-logo-transparent-800w.png';

    return (
        <img
            src={logoSrc}
            alt="Inn 32"
            className={`transition-all duration-300 ${className || 'h-12 w-auto'}`}
        />
    )
};

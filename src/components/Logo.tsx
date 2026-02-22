interface LogoProps {
    className?: string;
    variant?: 'color' | 'white';
    isScrolled?: boolean;
}

export default function Logo({ className = "" }: LogoProps) {
    return (
        <a href="/" className={`inline-flex items-center gap-2 ${className}`}>
            <img
                src="/inn_32_logo.png"
                alt="Inn 32"
                className={`h-12 w-auto transition-all duration-300`}
            />
        </a>
    )
};

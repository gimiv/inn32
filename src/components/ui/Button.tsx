import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '../../utils/cn'

interface BaseProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'navy'
    size?: 'sm' | 'md' | 'lg'
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export const linkButtonStyles = ({ variant = 'primary', size = 'md' }: BaseProps) => {
    return cn(
        "inline-flex items-center justify-center border font-sans font-medium rounded-full transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5",
        {
            'bg-primary text-white border-transparent hover:bg-primary/90': variant === 'primary',
            'bg-navy text-white border-transparent hover:bg-mountain-blue': variant === 'navy',
            'bg-white text-navy border-transparent hover:bg-cream': variant === 'secondary',
            'bg-transparent text-navy dark:text-white border-navy dark:border-white hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy shadow-none hover:shadow-md': variant === 'outline',
            'px-5 py-2.5 text-sm': size === 'sm',
            'px-8 py-3 text-base': size === 'md',
            'px-10 py-4 text-lg': size === 'lg',
        }
    )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(linkButtonStyles({ variant, size }), className)}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export const LinkButton = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, variant, size, href, ...props }, ref) => {
        return (
            <Link
                ref={ref}
                href={href}
                className={cn(linkButtonStyles({ variant, size }), className)}
                {...props}
            />
        )
    }
)
LinkButton.displayName = 'LinkButton'

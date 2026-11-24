export interface NavLink {
    name: string
    href: string
}

/** Desktop primary nav: at most five destinations, plus the separate Book Now CTA. */
export const PRIMARY_NAV_LINKS: NavLink[] = [
    { name: 'Rooms', href: '/rooms' },
    { name: 'Offers', href: '/offers' },
    { name: 'Seasonal Rentals', href: '/seasonal' },
    { name: 'Things To Do', href: '/things-to-do' },
    { name: 'Location', href: '/location' },
]

/** Lower-priority destinations, shown in the desktop "More" menu. */
export const SECONDARY_NAV_LINKS: NavLink[] = [
    { name: 'Amenities', href: '/amenities' },
    { name: 'Events', href: '/events' },
    { name: 'Groups', href: '/groups' },
    { name: 'Blog', href: '/blog' },
]

/** Every destination — used for the mobile menu, which shows all links. */
export const ALL_NAV_LINKS: NavLink[] = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS]

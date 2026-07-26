import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveHomepagePaginationRedirect } from './lib/redirects'

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl
    const destination = resolveHomepagePaginationRedirect(pathname, search)

    if (destination) {
        return NextResponse.redirect(destination, 308)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/',
}

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Ensures the route is not statically optimized
export const revalidate = 0 // Never cache this route
export const fetchCache = 'force-no-store' // Disable fetch cache

export async function GET() {
  try {
    const greenhouseResponse = await fetch(
      'https://boards-api.greenhouse.io/v1/boards/openenergytransition/jobs',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Website/1.0)',
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store', // Disable all caching
        next: { revalidate: 0 }, // Force revalidation every time
      },
    )

    if (!greenhouseResponse.ok) {
      throw new Error(`Failed to fetch jobs: ${greenhouseResponse.status}`)
    }

    const data = await greenhouseResponse.json()

    // Return the data with aggressive no-cache headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  } catch (error) {
    console.error('Greenhouse API error:', error)
    return NextResponse.json({ error: 'Failed to fetch job listings' }, { status: 500 })
  }
}

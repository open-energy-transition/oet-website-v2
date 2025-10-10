import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Ensures the route is not statically optimized

export async function GET() {
  try {
    const greenhouseResponse = await fetch(
      'https://boards-api.greenhouse.io/v1/boards/openenergytransition/jobs',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Website/1.0)', // Set a proper User-Agent
        },
        cache: 'no-store', // Don't cache on the server
      },
    )

    if (!greenhouseResponse.ok) {
      throw new Error(`Failed to fetch jobs: ${greenhouseResponse.status}`)
    }

    const data = await greenhouseResponse.json()

    // Return the data with CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=3600', // Cache for an hour
      },
    })
  } catch (error) {
    console.error('Greenhouse API error:', error)
    return NextResponse.json({ error: 'Failed to fetch job listings' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic' // Ensures the route is not statically optimized

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch all staff categories
    const staffCategoriesQuery = await payload.find({
      collection: 'staff',
      depth: 0,
      sort: 'order', // Sort by order field if available
      limit: 999999,
    })

    // Return the data with appropriate headers
    return NextResponse.json(staffCategoriesQuery, {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=3600', // Cache for an hour
      },
    })
  } catch (error) {
    console.error('Error fetching staff categories:', error)
    return NextResponse.json({ error: 'Failed to fetch staff categories' }, { status: 500 })
  }
}

import type { DepartmentsListBlock as DepartmentsListBlockProps } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import ReadMoreSection from './ReadMoreSection'

export const DepartmentsListBlock: React.FC<DepartmentsListBlockProps & { id?: string }> = (
  props,
) => {
  const { departments } = props
  return (
    <div className="content-block">
      <div className="container my-16">
        <div className="grid gap-6 md:grid-cols-2">
          {(departments ?? []).map((department: any) => (
            <div key={department.id} className="p-4 bg-white rounded-lg shadow-sm relative">
              {/* Representative member image with hover name tooltip */}
              {department.representativeMember && (
                <div className="absolute top-4 right-4 group">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm bg-gray-100">
                    {department.representativeMember.image ? (
                      <Image
                        src={
                          typeof department.representativeMember.image === 'object' &&
                          department.representativeMember.image.url
                            ? department.representativeMember.image.url
                            : `/api/media/${department.representativeMember.image}`
                        }
                        alt={
                          typeof department.representativeMember === 'object'
                            ? `${department.representativeMember.firstName || ''} ${department.representativeMember.lastName || ''}`
                            : 'Department Representative'
                        }
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        title={
                          typeof department.representativeMember === 'object'
                            ? `${department.representativeMember.firstName || ''} ${department.representativeMember.lastName || ''}`.trim()
                            : 'Department Representative'
                        }
                      />
                    ) : (
                      // Fallback for when image is not available
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {typeof department.representativeMember === 'object' &&
                        department.representativeMember.firstName
                          ? department.representativeMember.firstName.charAt(0)
                          : '?'}
                      </div>
                    )}
                    {/* Tooltip that appears on hover */}
                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                      {typeof department.representativeMember === 'object'
                        ? `${department.representativeMember.firstName || ''} ${department.representativeMember.lastName || ''}`.trim()
                        : 'Department Representative'}
                    </div>
                  </div>
                </div>
              )}

              {department.icon && department.icon.svg && (
                <span
                  className="inline-block mb-8 size-10 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: department.icon.svg }}
                />
              )}
              <div className="text-[40px] font-poppins font-normal leading-none mb-6">
                {department.department}
              </div>
              {department.shortDescription && (
                <div className="font-heebo font-normal text-lg leading-normal mb-9 relative">
                  <div>{department.shortDescription}</div>
                </div>
              )}

              {/* Department detail button */}
              <div className="mt-6 flex justify-end">
                <Link
                  href={`/departments/${department.id}`}
                  className="inline-block px-4 py-2 border border-black text-black rounded transition-colors hover:bg-gray-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

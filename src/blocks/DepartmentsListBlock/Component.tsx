import type { DepartmentsListBlock as DepartmentsListBlockProps } from '@/payload-types'
import Link from 'next/link'
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
            <div key={department.id} className="p-4  bg-white">
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
                <ReadMoreSection
                  department={department}
                  text={department.shortDescription}
                  project={
                    department.projects && department.projects.length > 0
                      ? department.projects[0]
                      : null
                  }
                />
              )}
              {departments && departments.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-col gap-4">
                    {department.projects &&
                      department.projects.map((project: any) => (
                        <div key={project.id}>
                          {project && project.slug && (
                            <Link
                              href={'/projects/' + project.slug}
                              className="flex gap-4 items-start"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {department.icon && department.icon.svg && (
                                <span
                                  className="inline-block mb-6 mt-0.5 size-4 [&>svg]:w-full [&>svg]:h-full"
                                  dangerouslySetInnerHTML={{ __html: department.icon.svg }}
                                />
                              )}
                              <div className="font-heebo text-base leading-normal font-normal">
                                {project.title}
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

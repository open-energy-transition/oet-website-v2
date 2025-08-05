import React from 'react'
import type { ToolsWeSupportBlock as ToolsWeSupportBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ToolsWeSupportBlock: React.FC<ToolsWeSupportBlockProps> = ({
  title,
  description,
  services,
}) => {
  return (
    <div className="container py-8">
      <div className="flex">
        <div className="mb-6 w-1/2">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && <RichText className="" data={description} />}
        </div>
        <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Array.isArray(services) &&
            services.length > 0 &&
            services.map((service, i) => (
              <div key={i} className="p-6 bg-card rounded-lg shadow">
                {/* <span className="text-primary font-bold text-xl">{service.number}</span> */}
                <div className="">
                  <i className={service.icon + ' text-2xl text-primary'}></i>
                  <h3 className="font-semibold text-lg">
                    {typeof service.model === 'object' && 'title' in service.model
                      ? service.model.title
                      : ''}
                  </h3>
                  <p className="text-muted-foreground">
                    {typeof service.model === 'object' && 'description' in service.model
                      ? service.model.description
                      : ''}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

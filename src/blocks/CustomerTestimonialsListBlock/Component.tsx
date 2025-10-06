import type { CustomerTestimonialsListBlock as CustomerTestimonialsListBlockProps } from '@/payload-types'
import Image from 'next/image'

const Star: React.FC = () => (
  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.07088 0.612343C9.41462 -0.204115 10.5854 -0.204114 10.9291 0.612346L12.9579 5.43123C13.1029 5.77543 13.4306 6.01061 13.8067 6.0404L19.0727 6.45748C19.9649 6.52814 20.3267 7.62813 19.6469 8.2034L15.6348 11.5987C15.3482 11.8412 15.223 12.2218 15.3106 12.5843L16.5363 17.661C16.744 18.5211 15.7969 19.201 15.033 18.7401L10.5245 16.0196C10.2025 15.8252 9.7975 15.8252 9.47548 16.0196L4.96699 18.7401C4.20311 19.201 3.25596 18.5211 3.46363 17.661L4.68942 12.5843C4.77698 12.2218 4.65182 11.8412 4.36526 11.5987L0.353062 8.2034C-0.326718 7.62813 0.0350679 6.52814 0.927291 6.45748L6.19336 6.0404C6.5695 6.01061 6.89716 5.77543 7.04207 5.43123L9.07088 0.612343Z"
      fill="#0B0C0B"
    />
  </svg>
)

export const CustomerTestimonialsListBlock: React.FC<
  CustomerTestimonialsListBlockProps & { id?: string }
> = (props) => {
  const { customerTestimonials, title, subtitle } = props
  console.log(customerTestimonials)
  return (
    <div className="content-block">
      <div className="container my-16">
        {title && <div className="text-4xl font-poppins font-normal leading-none">{title}</div>}
        {subtitle && (
          <div className="text-lg font-heebo font-normal leading-none mt-6 mb-10">{subtitle}</div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {(customerTestimonials ?? []).map((customerTestimonial: any) => (
            <div key={customerTestimonial.id}>
              {customerTestimonial.score && (
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: customerTestimonial.score }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              )}
              {customerTestimonial.description && (
                <div className="font-kode_mono font-normal text-sm leading-normal mb-8 relative">
                  <div>{customerTestimonial.description}</div>
                </div>
              )}
              {customerTestimonial.avatar && customerTestimonial.avatar.url && (
                <div className="mb-4">
                  <Image
                    src={customerTestimonial.avatar.url}
                    alt={customerTestimonial.name || 'Customer Avatar'}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              )}
              {(customerTestimonial.name || customerTestimonial.position) && (
                <div className="font-heebo font-semibold text-base leading-normal">
                  {customerTestimonial.name}
                </div>
              )}
              {customerTestimonial.position && (
                <span className="font-heebo font-normal text-sm leading-normal">
                  {customerTestimonial.position}
                  {customerTestimonial.company && <span>, {customerTestimonial.company}</span>}
                </span>
              )}

              {customerTestimonial.companyLogo && customerTestimonial.companyLogo.url && (
                <div className="mt-6">
                  <Image
                    src={customerTestimonial.companyLogo.url}
                    width={150}
                    height={40}
                    alt={customerTestimonial.company || 'Company Logo'}
                    className="h-10 object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

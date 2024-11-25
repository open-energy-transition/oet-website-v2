'use client'
import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { TextCard } from './TextCard'

type TextSliderProps = {
  CardComponent?: React.ComponentType<any>
  endpoint?: string
}

const Textslider = ({ CardComponent, endpoint }: TextSliderProps) => {
  const getRandomDelay = () => Math.floor(Math.random() * (5500 - 4000 + 1) + 4000)
  const [delay] = React.useState(getRandomDelay())

  // State to hold fetched data
  const [items, setItems] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch data in useEffect
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/${endpoint}`) // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()
        console.log('data', data)
        setItems(data.docs)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Render loading or error states
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Carousel
      className="w-[75%] md:w-[85%]"
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: delay,
        }),
      ]}
    >
      <CarouselContent className="-ml-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              {CardComponent === TextCard ? (
                // Render with redTextKey when CardComponent is TextCard
                <TextCard {...item} redTextKey={String(index + 1).padStart(2, '0')} key={index} />
              ) : CardComponent ? (
                // Render as normal for other CardComponents
                <CardComponent {...item} />
              ) : null}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Textslider

'use client'
import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
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
  CardComponent: React.ComponentType<any>
}

const Textslider = ({ CardComponent }: TextSliderProps) => {
  const getRandomDelay = () => Math.floor(Math.random() * (5500 - 4000 + 1) + 4000)
  const [delay] = React.useState(getRandomDelay())

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
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">{CardComponent ? <CardComponent /> : <TextCard />}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Textslider

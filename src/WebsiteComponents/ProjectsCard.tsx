'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import Image from 'next/image'
import type { ProjectCard } from '@/payload-types'

const ProjectsCard = ({ title, description, image }: ProjectCard) => {
  return (
    <Card className="bg-[#7C9885] bg-opacity-[0.7]">
      <CardHeader>
        <CardTitle>
          {typeof image === 'string' ? (
            <Image src={image} width={600} height={600} alt="technology" />
          ) : (
            <Image src={image.url} width={600} height={600} alt="technology" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="pb-2 font-bold ">{title}</p>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

export default ProjectsCard

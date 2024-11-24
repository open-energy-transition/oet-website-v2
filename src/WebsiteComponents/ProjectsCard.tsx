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

const ProjectsCard = () => {
  return (
    <Card className="bg-[#7C9885] bg-opacity-[0.7]">
      <CardHeader>
        <CardTitle>
          <Image src="/api/media/file/system.png" width={600} height={600} alt="technology" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="pb-2 font-bold ">
          Open Energy Transition (OET) is a non-profit environmental think tank
        </p>
        <p>
          Open Energy Transition (OET) is a non-profit environmental think tank and software company
          dedicated to tackle energy planning challenges. We co-maintain some of the most popular
          open-source Python tools that empower people
        </p>
      </CardContent>
    </Card>
  )
}

export default ProjectsCard

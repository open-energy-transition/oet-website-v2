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

import RedHeadingText from './RedHeadingText'

import type { OutputCardPayload } from '@/payload-types'

export function OutputCard({ title, category }: OutputCardPayload) {
  return (
    <Card className=" bg-[#cddbb5]">
      <CardHeader>
        <CardTitle>
          <span className="pl-1">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {category?.map((cat) => (
          <Popover key={typeof cat === 'string' ? cat : cat.title}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="m-1">
                {typeof cat === 'string' ? cat : cat.title}
              </Button>
            </PopoverTrigger>
          </Popover>
        ))}
      </CardContent>
    </Card>
  )
}

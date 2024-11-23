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

export function OutputCard() {
  return (
    <Card className=" bg-[#cddbb5]">
      <CardHeader>
        <CardTitle>
          <span className="pl-1">OUR GLOBAL IMPACT WITH OPEN ENERGY PLANNING</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="m-1">
              Technology
            </Button>
          </PopoverTrigger>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="m-1">
              Technology
            </Button>
          </PopoverTrigger>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="m-1">
              Technology
            </Button>
          </PopoverTrigger>
        </Popover>
      </CardContent>
    </Card>
  )
}

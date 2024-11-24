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
import RedHeadingText from './RedHeadingText'

export function TextCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <RedHeadingText text="01" />
          <span className="pl-1">OUR GLOBAL IMPACT WITH OPEN ENERGY PLANNING</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        Open Energy Transition (OET) is a non-profit environmental think tank and software company
        dedicated to tackle energy planning challenges. We co-maintain some of the most popular
        open-source Python tools that empower people
      </CardContent>
    </Card>
  )
}

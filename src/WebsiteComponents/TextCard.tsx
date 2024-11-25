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

import type { TextCardPayload } from '@/payload-types'

export function TextCard({
  description,
  title,
  redTextKey,
}: TextCardPayload & { redTextKey: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <RedHeadingText text={redTextKey} />
          <span className="pl-1">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  )
}

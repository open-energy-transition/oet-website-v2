'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export function TeamMemberComponent() {
  return (
    <Card className="bg-[#E41E3C]">
      <CardContent className="border flex flex-col justify-center align-middle items-center w-full h-[35vh]">
        <Avatar className="scale-[2] sm:scale-[5] md:scale-[5]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex flex-col justify-center align-middle text-white">
        <p className="text-4xl font-semibold">Shad</p>
        <p className="text-2xl font">Shad</p>
      </CardFooter>
    </Card>
  )
}

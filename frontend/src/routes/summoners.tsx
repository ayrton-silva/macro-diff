import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/summoners')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div>Hello "/summoners"!</div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

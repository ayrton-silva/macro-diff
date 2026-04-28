import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/summoners')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/summoners"!</div>
}

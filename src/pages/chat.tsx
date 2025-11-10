import { Button } from '@/components/ui/button'
import { isAuthenticated } from '@/service/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  beforeLoad: () => {
    if(!isAuthenticated()){
      return;
    }
    return;
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Button onClick={isAuthenticated}>IsLoggedIn</Button>
}

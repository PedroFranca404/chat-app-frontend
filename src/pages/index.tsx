import { Button } from "@/components/ui/button";
import { isAuthenticated, logout } from "@/service/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async () => {
    let authenticated: boolean = await isAuthenticated();
    if (!authenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

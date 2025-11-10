import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Login } from "@/service/auth";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChanges = (event: any) => {
    const { name, value } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await Login(formData);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return <Navigate to="/" />  
  }

  return (
    <div className="w-full max-w-[400px] px-4 mx-auto">
      <Card className="shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-semibold tracking-tight">Login</CardTitle>
          <CardDescription className="text-muted-foreground/80">Enter your email and password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="you@example.com" 
                onChange={handleChanges}
                required 
                value={formData.email}
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link to="/forgot" className="text-sm text-primary hover:text-primary/90">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChanges}
                required 
                className="h-11"
              />
            </div>
            <div className="grid gap-4">
              <Button type="submit" className="h-11 text-base font-medium">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground/80">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:text-primary/90 font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

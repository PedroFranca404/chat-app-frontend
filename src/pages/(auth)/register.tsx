import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Register } from "@/service/auth";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alertData, setAlertData] = useState({
    isShown: false,
    title: "",
    description: "",
  });

  const handleChanges = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAlertData({
        isShown: true,
        title: "Passwords do not match",
        description: "Please enter the same password in both fields.",
      });
      return;
    }
    const response = await Register(formData);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    console.log(response);
  };

  return (
    <div className="w-full max-w-[400px] px-4 mx-auto">
      <Card className="shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Register
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Create an account now
          </CardDescription>
          {alertData.isShown && (
            <Alert variant={"destructive"}>
              <AlertTitle>{alertData.title}</AlertTitle>
              <AlertDescription>{alertData.description}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
                className="h-11"
                value={formData.username}
                onChange={handleChanges}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11"
                value={formData.email}
                onChange={handleChanges}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-11"
                value={formData.password}
                onChange={handleChanges}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="h-11"
                value={formData.confirmPassword}
                onChange={handleChanges}
              />
            </div>
            <div className="grid gap-4">
              <Button type="submit" className="h-11 text-base font-medium">
                Register
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground/80">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/90 font-medium"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

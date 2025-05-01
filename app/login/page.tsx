"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to DocMitr",
        });
        router.push("/");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative h-20 w-40 mb-2">
            <Image
              src="/logo.png"
              alt="DocMitr Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-semibold text-blue-600">
            Healthcare Management
          </h1>
        </div>

        <div className="rounded-lg bg-card p-6 shadow-md border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <div className="mt-6 rounded-lg bg-card p-4 shadow-md border">
          <p className="text-sm font-medium mb-2">Demo Accounts:</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between text-left font-normal"
              onClick={() => handleDemoLogin("admin@docmitr.com")}
            >
              <span>Admin</span>
              <span className="text-muted-foreground">admin@docmitr.com</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between text-left font-normal"
              onClick={() => handleDemoLogin("doctor@docmitr.com")}
            >
              <span>Doctor</span>
              <span className="text-muted-foreground">doctor@docmitr.com</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between text-left font-normal"
              onClick={() => handleDemoLogin("staff@docmitr.com")}
            >
              <span>Staff</span>
              <span className="text-muted-foreground">staff@docmitr.com</span>
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Password for all accounts: password123
          </p>
        </div>
      </div>
    </div>
  );
}

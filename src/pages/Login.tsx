import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginApi } from "@/api";
import { ThemeToggle } from "@/components/theme-toggle";
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
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store";
import { ILoginCredentials } from "@/types";

const Login = () => {
  const [formData, setFormData] = useState<ILoginCredentials>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuthStore();

  // ================= API CALL =================
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => await loginApi(formData),
    onSuccess: (data) => {
      // Handle successful login
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      login(data);
      navigate("/chat");
    },
    onError: (error) => {
      console.log("Login failed:", error);

      // Try to extract error message from AxiosError, fallback to default
      const errorMessage =
        (error as any)?.response?.data?.detail || "Login failed. Please try again.";
      // Handle login error
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPending) {
      return;
    }
    if (!formData.username || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    await mutateAsync();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-2xl font-bold text-foreground"
          >
            <GraduationCap className="h-8 w-8 text-accent" />
            <span>OUI InfoMate</span>
          </Link>
        </div>

        {/* Login Form */}
        <Card className="shadow-large border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to get OUI information and assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="hero"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-accent hover:text-accent-hover font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { registerApi } from "@/api";
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
import { IRegisterCredentials } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<IRegisterCredentials>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, setUserProfile } = useAuthStore();

  // ================= API CALL =================
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => await registerApi(formData),
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: "You can now log in with your new account.",
      });
      login(data.token);
      setUserProfile({ ...data, token: undefined });
      navigate("/chat");
      return;
    },
    onError: (error) => {
      console.log("Registration failed:", error);
      let errorMessage = "Registration failed. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as any).response?.data?.detail
      ) {
        errorMessage = (error as any).response.data.detail;
      }
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPending) {
      return;
    }
    // Validate form data
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.username
    ) {
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

        {/* Signup Form */}
        <Card className="shadow-large border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Join OUI students getting instant school information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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
                    placeholder="Create a password"
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
                {isPending ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-accent hover:text-accent-hover font-medium"
              >
                Sign in
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

export default Register;

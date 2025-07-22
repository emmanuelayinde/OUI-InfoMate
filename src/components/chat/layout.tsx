import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader, RefreshCw, UserX } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUserApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userProfile, setUserProfile, isAuthenticated, logout } =
    useAuthStore();
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  // Fetch user profile if authenticated but not present
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => await getCurrentUserApi(),
    enabled: isAuthenticated && !userProfile,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data, setUserProfile]);

  // Handle authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, logout, navigate]);

  // If not authenticated, show info screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <UserX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">
              Authentication Required
            </h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access the chat.
            </p>
            <div className="space-y-3">
              <Button onClick={handleGoToLogin} className="w-full">
                Sign In
              </Button>
              <Button
                onClick={handleGoToHome}
                variant="outline"
                className="w-full"
              >
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If there's an error fetching user profile
  if (error && isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">
              Unable to Load Profile
            </h2>
            <p className="text-muted-foreground mb-6">
              We couldn't load your profile information. This might be a
              temporary issue.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => refetch()}
                className="w-full flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
              <Button
                onClick={handleGoToHome}
                variant="outline"
                className="w-full"
              >
                Go to Home
              </Button>
              <Button onClick={logout} variant="ghost" className="w-full">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state with better UI
  if (isAuthenticated && !userProfile && isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Loader className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Loading Your Profile</h2>
            <p className="text-muted-foreground mb-4">
              Please wait while we set up your chat experience...
            </p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state - render children
  if (isAuthenticated && userProfile) {
    return children;
  }

  // Fallback state
  return null;
};

export default Layout;

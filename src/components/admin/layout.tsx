import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store";
import { Lock, LogOut, Settings, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userProfile, isAuthenticated, userType, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToChat = () => {
    navigate("/chat");
  };

  // If user is not authenticated
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
              You need to be logged in to access the admin dashboard.
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

  // If user is authenticated but not admin
  if (userType !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground mb-2">
              Welcome, {userProfile?.first_name} {userProfile?.last_name}!
            </p>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges to access this dashboard.
            </p>
            <div className="space-y-3">
              <Button onClick={handleGoToChat} className="w-full">
                Go to Chat
              </Button>
              <Button
                onClick={handleGoToHome}
                variant="outline"
                className="w-full"
              >
                Go to Home
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {userProfile.first_name} {userProfile.last_name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;

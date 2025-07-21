import { getCurrentUserApi } from "@/api";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userProfile, setUserProfile, isAuthenticated, logout } =
    useAuthStore();
  const navigate = useNavigate();

  // Redirect and logout if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, logout, navigate]);

  // Fetch user profile if authenticated but not present
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => await getCurrentUserApi(),
    enabled: isAuthenticated && !userProfile,
  });

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data, setUserProfile]);

  if (isAuthenticated && !userProfile && isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isAuthenticated && userProfile) {
    return children;
  }

  return null;
};

export default Layout;

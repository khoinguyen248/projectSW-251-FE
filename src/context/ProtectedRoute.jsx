import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useProfile } from "./ProfileContext";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  const { profile, fetchProfile, isProfileComplete } = useProfile();

  useEffect(() => {
    if (user && ready) {
      fetchProfile();
    }
  }, [user, ready]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  // Redirect to profile setup if profile is not complete
  if (user && isProfileComplete === false && window.location.pathname !== "/profile-setup") {
    window.location.href = "/profile-setup";
    return null;
  }

  return children;
}
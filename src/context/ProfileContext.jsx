import { createContext, useContext, useState, useMemo } from "react";
import { getProfile, updateProfile as apiUpdateProfile } from "../hooks/useAuth";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfile();
      setProfile(profileData);
      return profileData;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      await apiUpdateProfile(profileData);
      // Refresh profile data after update
      const updatedProfile = await fetchProfile();
      return updatedProfile;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      profile,
      loading,
      fetchProfile,
      updateProfile,
      isProfileComplete: profile?.fullName && profile?.fullName.trim() !== ""
    }),
    [profile, loading]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};
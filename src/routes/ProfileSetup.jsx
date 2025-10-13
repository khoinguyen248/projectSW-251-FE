import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

export default function ProfileSetup() {
  const { user } = useAuth();
  const { profile, updateProfile, fetchProfile, isProfileComplete } = useProfile();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    // Tutor fields
    subjectSpecialty: [],
    experienceYears: "",
    bio: "",
    hourlyRate: "",
    availability: [],
    // Student fields
    grade: "",
    schoolName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if profile is already complete
  useEffect(() => {
    if (isProfileComplete) {
      navigate("/", { replace: true });
    }
  }, [isProfileComplete, navigate]);

  // Load existing profile data
  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        fullName: profile.fullName || "",
        subjectSpecialty: profile.subjectSpecialty || [],
        experienceYears: profile.experienceYears || "",
        bio: profile.bio || "",
        hourlyRate: profile.hourlyRate || "",
        availability: profile.availability || [],
        grade: profile.grade || "",
        schoolName: profile.schoolName || ""
      }));
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateProfile(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const isTutor = user?.role === "TUTOR";
  const isStudent = user?.role === "STUDENT";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
              />
            </div>
          </div>
        </div>

        {/* Role-specific Fields */}
        {isTutor && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Tutor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects (comma separated)
                </label>
                <input
                  type="text"
                  value={form.subjectSpecialty.join(", ")}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    subjectSpecialty: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Math, Physics, Chemistry"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years)
                </label>
                <input
                  type="number"
                  value={form.experienceYears}
                  onChange={(e) => setForm(prev => ({ ...prev, experienceYears: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={form.hourlyRate}
                  onChange={(e) => setForm(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="25"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell students about your teaching experience and approach..."
                />
              </div>
            </div>
          </div>
        )}

        {isStudent && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <input
                  type="text"
                  value={form.grade}
                  onChange={(e) => setForm(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Grade 10"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={(e) => setForm(prev => ({ ...prev, schoolName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your school name"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !form.fullName.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
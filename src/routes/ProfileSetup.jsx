import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { validateFullName } from "../utils/helpers";

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
    // NEW Tutor fields for AI Matching
    teachingStyle: "structured",
    expertiseLevel: {},
    studentLevelPreference: [],
    maxStudents: 5,
    certification: [],
    educationBackground: "",
    // Student fields
    grade: "",
    schoolName: "",
    // NEW Student fields for AI Matching
    learningGoals: [],
    preferredSubjects: [],
    studentAvailability: [],
    learningStyle: "visual",
    academicLevel: "intermediate",
    preferredPriceRange: { min: 0, max: 500 },
    goals: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("basic");
  const [fullNameError, setFullNameError] = useState("");

  // Redirect if profile is already complete


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
        schoolName: profile.schoolName || "",
        // Load new fields if they exist
        learningGoals: profile.learningGoals || [],
        preferredSubjects: profile.preferredSubjects || [],
        studentAvailability: profile.studentAvailability || [],
        learningStyle: profile.learningStyle || "visual",
        academicLevel: profile.academicLevel || "intermediate",
        teachingStyle: profile.teachingStyle || "structured",
        expertiseLevel: profile.expertiseLevel || {},
        studentLevelPreference: profile.studentLevelPreference || [],
        maxStudents: profile.maxStudents || 5,
        certification: profile.certification || [],
        educationBackground: profile.educationBackground || "",
        goals: profile.goals || ""
      }));
    }
  }, [profile]);
  const buildPayloadByRole = (form, user) => {
  if (user?.role === "STUDENT") {
    return {
      fullName: form.fullName,
      grade: form.grade,
      schoolName: form.schoolName,
      learningGoals: form.learningGoals || [],
      preferredSubjects: form.preferredSubjects || [],
      studentAvailability: form.studentAvailability || [],
      learningStyle: form.learningStyle,
      academicLevel: form.academicLevel,
      preferredPriceRange: form.preferredPriceRange,
      goals: form.goals
    };
  }

  if (user?.role === "TUTOR") {
    return {
      fullName: form.fullName,
      subjectSpecialty: form.subjectSpecialty || [],
      experienceYears: Number(form.experienceYears) || 0,
      bio: form.bio,
      hourlyRate: Number(form.hourlyRate) || 0,
      availability: form.availability || [],
      teachingStyle: form.teachingStyle,
      expertiseLevel: form.expertiseLevel || {},
      studentLevelPreference: form.studentLevelPreference || [],
      maxStudents: form.maxStudents || 5,
      certification: form.certification || [],
      educationBackground: form.educationBackground
    };
  }

  return { fullName: form.fullName };
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (fullNameError) {
    setError("Vui lòng sửa lỗi trong tên trước khi gửi.");
    setLoading(false);
    return;
  }

  try {
    const payload = buildPayloadByRole(form, user);
    console.log("Payload gửi lên:", payload);

    await updateProfile(payload);

    navigate("/", { replace: true });
  } catch (err) {
    console.error("Update profile error:", err);
    setError(err.response?.data?.message || "Failed to update profile");
  } finally {
    setLoading(false);
  }
};


  const isTutor = user?.role === "TUTOR";
  const isStudent = user?.role === "STUDENT";

  // Available options for forms
  const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Programming", "Biology", "History", "Geography"];
  const timeSlots = [
    'mon_14-16', 'mon_18-20',
    'tue_14-16', 'tue_18-20',
    'wed_14-16', 'wed_18-20',
    'thu_14-16', 'thu_18-20',
    'fri_14-16', 'fri_18-20',
    'sat_09-11', 'sat_14-16',
    'sun_09-11', 'sun_14-16'
  ];

  const toggleArrayItem = (array, item) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
      <p className="text-gray-600 mb-6">Help us find the perfect matches for you! 🎯</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Progress Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${activeSection === "basic"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
            }`}
          onClick={() => setActiveSection("basic")}
        >
          📝 Basic Info
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeSection === "preferences"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
            }`}
          onClick={() => setActiveSection("preferences")}
        >
          🎯 Preferences
        </button>
        {isTutor && (
          <button
            className={`px-4 py-2 font-medium ${activeSection === "expertise"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
              }`}
            onClick={() => setActiveSection("expertise")}
          >
            🎓 Expertise
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFORMATION SECTION */}
        {activeSection === "basic" && (
          <div className="space-y-6">
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
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm(prev => ({ ...prev, fullName: value }));
                      const validationError = validateFullName(value);
                      setFullNameError(validationError);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {fullNameError && (
                    <p className="text-red-500 text-sm mt-1">{fullNameError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Role-specific Basic Fields */}
            {isTutor && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Tutor Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subjects *
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {subjects.map(subject => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => setForm(prev => ({
                            ...prev,
                            subjectSpecialty: toggleArrayItem(prev.subjectSpecialty, subject)
                          }))}
                          className={`px-3 py-1 rounded-full text-sm ${form.subjectSpecialty.includes(subject)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                            }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={form.subjectSpecialty.join(", ")}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        subjectSpecialty: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Or type subjects separated by commas"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience (years) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="50"
                      value={form.experienceYears}
                      onChange={(e) => setForm(prev => ({ ...prev, experienceYears: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate (VND) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.hourlyRate}
                      onChange={(e) => setForm(prev => ({ ...prev, hourlyRate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="250000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Students
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={form.maxStudents}
                      onChange={(e) => setForm(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio *
                    </label>
                    <textarea
                      required
                      value={form.bio}
                      onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell students about your teaching experience and approach..."
                    />
                  </div>
                </div>
              </div>
            )}

            {isStudent && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Student Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Level *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.grade}
                      onChange={(e) => setForm(prev => ({ ...prev, grade: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Grade 10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.schoolName}
                      onChange={(e) => setForm(prev => ({ ...prev, schoolName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your school name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Learning Goals
                    </label>
                    <textarea
                      value={form.goals}
                      onChange={(e) => setForm(prev => ({ ...prev, goals: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What are your main learning objectives?"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PREFERENCES SECTION */}
        {activeSection === "preferences" && (
          <div className="space-y-6">
            {isStudent && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">🎯 Learning Preferences</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What subjects are you interested in? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map(subject => (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => setForm(prev => ({
                          ...prev,
                          learningGoals: toggleArrayItem(prev.learningGoals, subject)
                        }))}
                        className={`px-3 py-2 rounded-lg text-sm border ${form.learningGoals.includes(subject)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300"
                          }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Style *
                    </label>
                    <select
                      value={form.learningStyle}
                      onChange={(e) => setForm(prev => ({ ...prev, learningStyle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="visual">👀 Visual Learner</option>
                      <option value="auditory">👂 Auditory Learner</option>
                      <option value="kinesthetic">✋ Kinesthetic Learner</option>
                      <option value="mixed">🔄 Mixed Learning Style</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Academic Level *
                    </label>
                    <select
                      value={form.academicLevel}
                      onChange={(e) => setForm(prev => ({ ...prev, academicLevel: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">🟢 Beginner</option>
                      <option value="intermediate">🟡 Intermediate</option>
                      <option value="advanced">🔴 Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    When are you available for sessions? *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <label key={slot} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={form.studentAvailability.includes(slot)}
                          onChange={(e) => {
                            const newAvailability = e.target.checked
                              ? [...form.studentAvailability, slot]
                              : form.studentAvailability.filter(s => s !== slot);
                            setForm(prev => ({ ...prev, studentAvailability: newAvailability }));
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{slot.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isTutor && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">🎯 Teaching Preferences</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teaching Style *
                    </label>
                    <select
                      value={form.teachingStyle}
                      onChange={(e) => setForm(prev => ({ ...prev, teachingStyle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="structured">📚 Structured & Systematic</option>
                      <option value="interactive">💬 Interactive & Discussion-based</option>
                      <option value="flexible">🎯 Flexible & Adaptive</option>
                      <option value="practice">✍️ Practice-oriented</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Student Levels *
                    </label>
                    <div className="space-y-2">
                      {['beginner', 'intermediate', 'advanced'].map(level => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={form.studentLevelPreference.includes(level)}
                            onChange={(e) => {
                              const newPreferences = e.target.checked
                                ? [...form.studentLevelPreference, level]
                                : form.studentLevelPreference.filter(l => l !== level);
                              setForm(prev => ({ ...prev, studentLevelPreference: newPreferences }));
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm capitalize">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Available Time Slots *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <label key={slot} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={form.availability.includes(slot)}
                          onChange={(e) => {
                            const newAvailability = e.target.checked
                              ? [...form.availability, slot]
                              : form.availability.filter(s => s !== slot);
                            setForm(prev => ({ ...prev, availability: newAvailability }));
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{slot.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EXPERTISE SECTION (Tutor only) */}
        {activeSection === "expertise" && isTutor && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">🎓 Teaching Expertise</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Expertise Level in Each Subject *
              </label>
              <div className="space-y-3">
                {form.subjectSpecialty.map(subject => (
                  <div key={subject} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{subject}</span>
                    <select
                      value={form.expertiseLevel[subject] || 'intermediate'}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        expertiseLevel: {
                          ...prev.expertiseLevel,
                          [subject]: e.target.value
                        }
                      }))}
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="beginner">Beginner Level</option>
                      <option value="intermediate">Intermediate Level</option>
                      <option value="advanced">Advanced Level</option>
                      <option value="expert">Expert Level</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Background & Certifications
              </label>
              <textarea
                value={form.educationBackground}
                onChange={(e) => setForm(prev => ({ ...prev, educationBackground: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your degrees, teaching certifications, or relevant qualifications..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications (comma separated)
              </label>
              <input
                type="text"
                value={form.certification.join(", ")}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  certification: e.target.value.split(",").map(c => c.trim()).filter(c => c)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Teaching Certificate, IELTS 8.0, Math Competition Award..."
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              if (activeSection === "preferences") setActiveSection("basic");
              else if (activeSection === "expertise") setActiveSection("preferences");
            }}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={activeSection === "basic"}
          >
            ← Previous
          </button>

          {activeSection !== "expertise" && (
            <button
              type="button"
              onClick={() => {
                if (activeSection === "basic") setActiveSection("preferences");
                else if (activeSection === "preferences" && isTutor) setActiveSection("expertise");
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next →
            </button>
          )}

          {(activeSection === "expertise" || (activeSection === "preferences" && isStudent)) && (
            <button
              type="submit"
              disabled={loading || !form.fullName.trim() || fullNameError}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Complete Profile ✅"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
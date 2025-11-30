import { useState, useEffect } from "react";
import { getTutors, getSmartRecommendations } from "../../hooks/useAuth";

export default function TutorList() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  // Available filters
  const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Programming", "Biology", "All Subjects"];


  useEffect(() => {
    loadTutors();
  }, []);

  useEffect(() => {
    filterAndSortTutors();
  }, [tutors, searchTerm, selectedSubject, sortBy]);

  const loadTutors = async () => {
    try {
      const tutorsData = await getTutors();
      setTutors(tutorsData);

    } catch (error) {
      console.error("Failed to load tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTutors = () => {
    let filtered = [...tutors];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tutor =>
        tutor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjectSpecialty?.some(subject =>
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        tutor.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject && selectedSubject !== "All Subjects") {
      filtered = filtered.filter(tutor =>
        tutor.subjectSpecialty?.includes(selectedSubject)
      );
    }

    // Sort tutors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.ratingAvg || 0) - (a.ratingAvg || 0);
        case "experience":
          return (b.experienceYears || 0) - (a.experienceYears || 0);
        case "price-low":
          return (a.hourlyRate || 0) - (b.hourlyRate || 0);
        case "price-high":
          return (b.hourlyRate || 0) - (a.hourlyRate || 0);
        case "name":
          return (a.fullName || "").localeCompare(b.fullName || "");
        default:
          return 0;
      }
    });

    setFilteredTutors(filtered);
  };

  const getRatingStars = (rating) => {
    if (!rating) return "No ratings";
    const stars = "⭐".repeat(Math.round(rating));
    return `${stars} ${rating.toFixed(1)}`;
  };

  const getExpertiseBadge = (expertiseLevel, subject) => {
    const level = expertiseLevel?.[subject];
    if (!level) return null;

    const badges = {
      beginner: "🟢 Beginner",
      intermediate: "🟡 Intermediate",
      advanced: "🔴 Advanced",
      expert: "💎 Expert"
    };

    return badges[level] || level;
  };

  // Format tutor ID for display (first 8 characters)
  const formatTutorId = (id) => {
    if (!id) return "N/A";
    return id.substring(0, 8) + "...";
  };

  // Copy tutor ID to clipboard
  const copyTutorId = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      alert("Tutor ID copied to clipboard!");
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading tutors...</div>
        </div>
      </div>
    );
  }


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tutor Directory</h1>
          <p className="text-gray-600 mt-1">
            {filteredTutors.length} tutors found
            {selectedSubject && selectedSubject !== "All Subjects" && ` in ${selectedSubject}`}
          </p>

        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${viewMode === "table"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600"
                }`}
            >
              📊 Table
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`px-3 py-1 rounded-md text-sm font-medium ${viewMode === "card"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600"
                }`}
            >
              🎴 Cards
            </button>
          </div>

        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search tutors by name, subject, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.filter(subject => subject !== "All Subjects").map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Sort by: Rating</option>
              <option value="experience">Sort by: Experience</option>
              <option value="price-low">Sort by: Price: Low to High</option>
              <option value="price-high">Sort by: Price: High to Low</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE VIEW - FIXED VERSION */}
      {viewMode === "table" && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[120px]">
                    Tutor ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
                    Tutor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
                    Subjects & Expertise
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[120px]">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[140px]">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-[140px]">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTutors.map((tutor) => (
                  <tr key={tutor._id} className="hover:bg-gray-50 transition-colors">
                    {/* Tutor ID - Fixed */}
                    <td className="px-4 py-4 whitespace-nowrap overflow-hidden">
                      <div className="flex items-center space-x-1 w-full">
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded truncate flex-1">
                          {formatTutorId(tutor._id)}
                        </span>
                        <button
                          onClick={() => copyTutorId(tutor._id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                          title="Copy full ID"
                        >
                          📋
                        </button>
                      </div>
                    </td>

                    {/* Tutor Info - Fixed */}
                    <td className="px-4 py-4 overflow-hidden">
                      <div className="flex items-center w-full">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {tutor.fullName?.charAt(0) || "T"}
                          </span>
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {tutor.fullName || "Unnamed Tutor"}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {tutor.bio ? `${tutor.bio.substring(0, 40)}...` : "No bio"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Subjects & Expertise - Fixed */}
                    <td className="px-4 py-4 overflow-hidden">
                      <div className="space-y-1 w-full">
                        {tutor.subjectSpecialty?.slice(0, 3).map((subject) => (
                          <div key={subject} className="flex items-center justify-between text-sm w-full">
                            <span className="text-gray-700 truncate flex-1 mr-2">{subject}</span>
                            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                              {getExpertiseBadge(tutor.expertiseLevel, subject)}
                            </span>
                          </div>
                        ))}
                        {tutor.subjectSpecialty?.length > 3 && (
                          <div className="text-xs text-blue-600 whitespace-nowrap">
                            +{tutor.subjectSpecialty.length - 3} more subjects
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Experience - Fixed */}
                    <td className="px-4 py-4 whitespace-nowrap overflow-hidden">
                      <div className="text-sm text-gray-900">
                        {tutor.experienceYears || "0"} years
                      </div>
                      <div className="text-xs text-gray-500 truncate w-full">
                        {tutor.teachingStyle && `📚 ${tutor.teachingStyle}`}
                      </div>
                    </td>

                    {/* Rating - Fixed */}
                    <td className="px-4 py-4 whitespace-nowrap overflow-hidden">
                      <div className="text-sm text-gray-900 whitespace-nowrap">
                        {getRatingStars(tutor.ratingAvg)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tutor.totalRatings || 0} reviews
                      </div>
                    </td>

                    {/* Price - Fixed */}
                    <td className="px-4 py-4 whitespace-nowrap overflow-hidden">
                      <div className="text-sm font-semibold text-green-600">
                        ${(tutor.hourlyRate || 0).toLocaleString()}/hr
                      </div>
                      <div className="text-xs text-gray-500">
                        Max {tutor.maxStudents || 5} students
                      </div>
                    </td>

                    {/* Actions - Fixed */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium overflow-hidden">
                      <div className="flex space-x-2 w-full">
                        <button
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-1 text-center truncate"
                          onClick={() => {
                            alert(`Viewing profile of: ${tutor.fullName}\nID: ${tutor._id}`);
                          }}
                        >
                          View Profile
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-1 text-center truncate"
                          onClick={() => {
                            alert(`Booking session with: ${tutor.fullName}\nTutor ID: ${tutor._id}`);
                          }}
                        >
                          Book Session
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTutors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👨‍🏫</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedSubject
                  ? "Try adjusting your search criteria"
                  : "No tutors available at the moment"}
              </p>
              {(searchTerm || selectedSubject) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSubject("");
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* CARD VIEW (Fallback) - Updated with ID */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <div key={tutor._id} className="bg-white rounded-lg shadow-sm border p-6">
              {/* Tutor ID in card header */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: {formatTutorId(tutor._id)}
                </span>
                <button
                  onClick={() => copyTutorId(tutor._id)}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                  title="Copy ID"
                >
                  📋
                </button>
              </div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{tutor.fullName}</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {tutor.experienceYears || 0}y exp
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {tutor.bio || "No description available"}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subjects:</span>
                  <span className="font-medium text-right">
                    {tutor.subjectSpecialty?.slice(0, 2).join(", ")}
                    {tutor.subjectSpecialty?.length > 2 && "..."}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <span className="font-medium">
                    {getRatingStars(tutor.ratingAvg)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-semibold text-green-600">
                    ${(tutor.hourlyRate || 0).toLocaleString()}/hr
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  onClick={() => alert(`Booking session with: ${tutor.fullName}\nID: ${tutor._id}`)}
                >
                  Book Now
                </button>
                <button
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                  onClick={() => alert(`Viewing profile of: ${tutor.fullName}\nID: ${tutor._id}`)}
                >
                  👁
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
              <div className="flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
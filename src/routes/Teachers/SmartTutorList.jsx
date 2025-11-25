// New file: src/routes/Teachers/SmartTutorList.jsx
import { useState, useEffect } from "react";
import { getSmartRecommendations } from "../../hooks/useAuth";

export default function SmartTutorList() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subjects: [],
    schedule: ''
  });

  useEffect(() => {
    loadRecommendations();
  }, [filters]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.subjects.length > 0) queryParams.append('subjects', filters.subjects.join(','));
      if (filters.schedule) queryParams.append('schedule', filters.schedule);

      const data = await getSmartRecommendations(queryParams.toString());
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">🔄 Finding your perfect tutors...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Smart Tutor Recommendations</h1>
        
        {/* Filters */}
        <div className="flex gap-4">
          <select 
            className="border rounded px-3 py-1"
            onChange={(e) => setFilters({...filters, schedule: e.target.value})}
          >
            <option value="">Any Schedule</option>
            <option value="weekday_morning">Weekday Morning</option>
            <option value="weekday_evening">Weekday Evening</option>
            <option value="weekend">Weekend</option>
          </select>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((tutor) => (
          <div key={tutor._id} className="bg-white rounded-lg shadow-lg border-2 border-blue-100 p-6">
            {/* Match Badge */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">{tutor.fullName}</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {tutor.matchPercentage}% Match
              </span>
            </div>

            <p className="text-gray-600 mb-4">{tutor.bio}</p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Subjects:</span>
                <span className="text-sm font-medium">
                  {tutor.subjectSpecialty?.join(", ")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Experience:</span>
                <span className="text-sm font-medium">{tutor.experienceYears} years</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Rating:</span>
                <span className="text-sm font-medium flex items-center">
                  ⭐ {tutor.ratingAvg || "New"} 
                  <span className="text-gray-400 ml-1">({tutor.totalRatings || 0})</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Price:</span>
                <span className="text-sm font-medium text-green-600">
                  ${tutor.hourlyRate}/hour
                </span>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Book Session
            </button>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tutors found matching your criteria.</p>
          <button 
            onClick={() => setFilters({ subjects: [], schedule: '' })}
            className="text-blue-600 hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
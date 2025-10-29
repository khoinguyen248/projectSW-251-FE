import { useState, useEffect } from "react";
import { getTutors } from "../../hooks/useAuth";

export default function TutorList() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      const tutorsData = await getTutors();
      setTutors(tutorsData);
      console.log(tutorsData)
    } catch (error) {
      console.error("Failed to load tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading tutors...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map(tutor => (
          <div key={tutor._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{tutor.fullName}</h3>
            <p className="text-gray-600 mt-2">{tutor.bio}</p>
            <div className="mt-2">
              <span className="text-sm text-gray-500">
                Subjects: {tutor.subjectSpecialty?.join(", ")}
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-yellow-500">
                ⭐ {tutor.ratingAvg || "No ratings yet"}
              </span>
              <span className="ml-4 text-green-600">
                $ {tutor?.hourlyRate}/hour
              </span>
               <span className="ml-4 text-green-600">
                ID: {tutor._id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
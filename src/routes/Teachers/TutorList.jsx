import { useState, useEffect } from "react";
import { getTutors } from "../../hooks/useAuth";
import { Pagination } from "antd";

export default function TutorList() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      const tutorsData = await getTutors();
      // Mock data if empty for UI visualization
      if (!tutorsData || tutorsData.length === 0) {
        setTutors(Array(12).fill(null).map((_, i) => ({
          _id: i,
          fullName: ["Dimitres Viga", "Tom Housenburg", "Dana Benevista", "Salvadore Morbeau", "Maria Historia", "Jack Sally", "Lula Beatrice", "Nella Vita"][i % 8],
          subjectSpecialty: [["Mathematics"], ["Science"], ["Art"], ["Biology"], ["History"], ["Physics"], ["Algorithm"], ["English"]][i % 8],
          avatar: `https://i.pravatar.cc/150?img=${i + 10}`
        })));
      } else {
        setTutors(tutorsData);
      }
    } catch (error) {
      console.error("Failed to load tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = tutors.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-8 h-full flex flex-col">


      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-text-dark focus:outline-none shadow-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">🔍</span>
        </div>

        <div className="flex gap-4">
          <select className="px-6 py-3 rounded-full bg-white text-text-dark border-none shadow-sm focus:outline-none cursor-pointer min-w-[120px]">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
          <button className="px-6 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <span>+</span> New Teacher
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 overflow-y-auto pr-2">
        {currentData.map((tutor, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-primary">•••</button>
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
              <img src={tutor.avatar || `https://i.pravatar.cc/150?img=${index}`} alt={tutor.fullName} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-text-dark text-lg mb-1">{tutor.fullName}</h3>
            <p className="text-gray-500 text-sm mb-6">{tutor.subjectSpecialty?.[0] || "Teacher"}</p>

            <div className="flex gap-4 mt-auto">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                📞
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                ✉️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-auto flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={tutors.length}
          onChange={(page) => setCurrentPage(page)}
          itemRender={(page, type, originalElement) => {
            if (type === 'page') {
              return <a className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === page ? 'bg-primary text-white' : 'bg-white text-text-dark border border-gray-200 hover:bg-gray-50'}`}>{page}</a>;
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
}
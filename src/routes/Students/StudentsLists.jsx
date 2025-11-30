import { useState } from "react";
import { Drawer, Button, Form, Input, Pagination, Checkbox } from "antd";

const mockStudents = [
  {
    id: "#123456789",
    name: "Samantha William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    contact: { phone: true, email: true },
    grade: "VII A",
    gradeColor: "bg-secondary",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "#123456789",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    contact: { phone: true, email: true },
    grade: "VII B",
    gradeColor: "bg-accent",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "#123456789",
    name: "Karen Hope",
    date: "March 25, 2021",
    parent: "Justin Hope",
    city: "Jakarta",
    contact: { phone: true, email: true },
    grade: "VII C",
    gradeColor: "bg-primary",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "#123456789",
    name: "Jordan Nico",
    date: "March 25, 2021",
    parent: "Amanda Nico",
    city: "Jakarta",
    contact: { phone: true, email: true },
    grade: "VII A",
    gradeColor: "bg-secondary",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "#123456789",
    name: "Nadila Adja",
    date: "March 25, 2021",
    parent: "Jack Adja",
    city: "Jakarta",
    contact: { phone: true, email: true },
    grade: "VII B",
    gradeColor: "bg-accent",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "#123456789",
    name: "Johnny Ahmad",
    date: "March 25, 2021",
    parent: "Danny Ahmad",
    city: "Jakarta",
    contact: { phone: true, email: true },
    grade: "VII C",
    gradeColor: "bg-primary",
    avatar: "https://i.pravatar.cc/150?img=6"
  }
];

const pageSize = 5;

export default function StudentsList() {
  const [students, setStudents] = useState(mockStudents);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const showDrawer = (student = null) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = students.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-dark">Students</h2>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-white shadow-sm text-primary">
            🔔
          </button>
          <button className="p-2 rounded-full bg-white shadow-sm text-primary">
            ⚙️
          </button>
          <div className="text-right">
            <p className="text-sm font-bold text-text-dark">Nabila A.</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=32" alt="profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-text-dark focus:outline-none shadow-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">🔍</span>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2" onClick={() => showDrawer()}>
            <span>+</span> New Student
          </button>
          <select className="px-4 py-3 rounded-full bg-white text-text-dark border-none shadow-sm focus:outline-none cursor-pointer">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-dark font-bold border-b border-gray-100">
                <th className="p-6"><Checkbox /></th>
                <th className="p-6">Name</th>
                <th className="p-6">ID</th>
                <th className="p-6">Date</th>
                <th className="p-6">Parent Name</th>
                <th className="p-6">City</th>
                <th className="p-6">Contact</th>
                <th className="p-6">Grade</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                  <td className="p-6"><Checkbox /></td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-bold text-text-dark">{s.name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-primary font-bold">{s.id}</td>
                  <td className="p-6 text-gray-500">{s.date}</td>
                  <td className="p-6 text-text-dark">{s.parent}</td>
                  <td className="p-6 text-text-dark">{s.city}</td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <span className="w-8 h-8 rounded-full bg-bg-gray flex items-center justify-center text-primary cursor-pointer hover:bg-gray-200">📞</span>
                      <span className="w-8 h-8 rounded-full bg-bg-gray flex items-center justify-center text-primary cursor-pointer hover:bg-gray-200">✉️</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-4 py-1 rounded-full text-white text-sm font-medium ${s.gradeColor}`}
                    >
                      {s.grade}
                    </span>
                  </td>
                  <td className="p-6">
                    <Button type="text" onClick={() => showDrawer(s)} className="text-gray-400 hover:text-primary text-xl">
                      ...
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex justify-between items-center text-gray-500 text-sm">
          <p>Showing {startIndex + 1}-{Math.min(startIndex + pageSize, students.length)} from {students.length} data</p>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={students.length}
            onChange={(page) => setCurrentPage(page)}
            itemRender={(page, type, originalElement) => {
              if (type === 'page') {
                return <a className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page ? 'bg-primary text-white' : 'bg-transparent text-text-dark hover:bg-gray-100'}`}>{page}</a>;
              }
              return originalElement;
            }}
            className="custom-pagination"
          />
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        title={selectedStudent ? "Student Detail" : "Add New Student"}
        width={400}
        onClose={closeDrawer}
        open={open}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input defaultValue={selectedStudent?.name} />
          </Form.Item>
          <Form.Item label="ID">
            <Input defaultValue={selectedStudent?.id} />
          </Form.Item>
          <Form.Item label="Parent">
            <Input defaultValue={selectedStudent?.parent} />
          </Form.Item>
          <Form.Item label="City">
            <Input defaultValue={selectedStudent?.city} />
          </Form.Item>
          <Form.Item label="Grade">
            <Input defaultValue={selectedStudent?.grade} />
          </Form.Item>
          <Button type="primary" onClick={closeDrawer} className="bg-primary">
            Save
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
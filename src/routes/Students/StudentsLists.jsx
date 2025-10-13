import { useState } from "react";
import { Drawer, Button, Form, Input, Pagination } from "antd"; // thêm Pagination

const mockStudents = [
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
   {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
   {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  }
  ,
   {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
   {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  }
  ,
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  },
  {
    id: "123456789",
    name: "Samanta William",
    date: "March 25, 2021",
    parent: "Mana William",
    city: "Jakarta",
    grade: "VII A",
    gradeColor: "bg-red-500",
  },
  {
    id: "123456790",
    name: "Tony Soap",
    date: "March 25, 2021",
    parent: "James Soap",
    city: "Jakarta",
    grade: "VII B",
    gradeColor: "bg-yellow-400",
  }

];

const pageSize = 5; // số học sinh mỗi trang

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

  // Lấy dữ liệu theo trang
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = students.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
       <input
          type="text"
          placeholder="Search here..."
          className="border rounded-lg px-4 py-2 w-1/3"
        />
        <div className="flex gap-3">
          <select className="border rounded px-3 py-1">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
          <Button type="primary" onClick={() => showDrawer()}>
            + New Student
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-3">Name</th>
            <th className="p-3">ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Parent Name</th>
            <th className="p-3">City</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((s, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.name}</td>
              <td className="p-3 text-blue-600">{s.id}</td>
              <td className="p-3">{s.date}</td>
              <td className="p-3">{s.parent}</td>
              <td className="p-3">{s.city}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${s.gradeColor}`}
                >
                  {s.grade}
                </span>
              </td>
              <td className="p-3">
                <Button type="link" onClick={() => showDrawer(s)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={students.length}
          onChange={(page) => setCurrentPage(page)}
        />
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
          <Button type="primary" onClick={closeDrawer}>
            Save
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
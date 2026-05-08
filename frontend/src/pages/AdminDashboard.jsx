import { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // NEW
  const [activeSection, setActiveSection] = useState("users");

  // ================= FETCH =================
  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));

    setUsers(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  const fetchEnrollments = async () => {
    const res = await axios.get("http://localhost:5000/api/enroll");
    setEnrollments(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
    fetchEnrollments();
  }, []);

  // ================= ACTIONS =================
  const approveUser = async (id) => {
    await updateDoc(doc(db, "users", id), {
      approved: true,
    });

    fetchUsers();
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    await axios.delete(`http://localhost:5000/api/enroll/${id}`);

    fetchEnrollments();
  };

  // ================= FILTER =================
  const filtered = enrollments.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.contact?.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-blue-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setActiveSection("users")}
          className={`w-full text-left px-4 py-3 rounded mb-3 ${
            activeSection === "users"
              ? "bg-white text-blue-900"
              : "bg-blue-800"
          }`}
        >
          User Approval
        </button>

        <button
          onClick={() => setActiveSection("enrollments")}
          className={`w-full text-left px-4 py-3 rounded ${
            activeSection === "enrollments"
              ? "bg-white text-blue-900"
              : "bg-blue-800"
          }`}
        >
          Enrollment Forms
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-6">

        {/* ================= USERS ================= */}
        {activeSection === "users" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">
              User Approvals
            </h2>

            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white border rounded shadow p-4 mb-3"
              >
                <p className="font-semibold">{user.email}</p>

                <p className="mt-1">
                  Status:
                  <span className="ml-2">
                    {user.approved
                      ? "✅ Approved"
                      : "⏳ Pending"}
                  </span>
                </p>

                {!user.approved && (
                  <button
                    onClick={() => approveUser(user.id)}
                    className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
                  >
                    Approve User
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= ENROLLMENTS ================= */}
        {activeSection === "enrollments" && (
          <div>

            <h2 className="text-3xl font-bold mb-6">
              Enrollment Forms
            </h2>

            {/* SEARCH */}
            <input
              placeholder="Search by name or phone..."
              className="border p-3 mb-5 w-full rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-auto bg-white rounded shadow">
              <table className="min-w-full border text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="border p-3">Photo</th>
                    <th className="border p-3">Name</th>
                    <th className="border p-3">Contact</th>
                    <th className="border p-3">Course</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((item) => (
                    <tr key={item._id}>
                      <td className="border p-2">
                        {item.photo && (
                          <img
                            src={`http://localhost:5000/uploads/${item.photo}`}
                            className="w-14 h-16 object-cover"
                            alt="student"
                          />
                        )}
                      </td>

                      <td className="border p-2">{item.name}</td>

                      <td className="border p-2">
                        {item.contact}
                      </td>

                      <td className="border p-2">
                        {item.selectedCourse}
                      </td>

                      <td className="border p-2 space-x-2">

                        {/* VIEW */}
                        <button
                          onClick={() => setSelected(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          View
                        </button>

                        {/* WORD */}
                        <button
                          onClick={() =>
                            window.open(
                              `http://localhost:5000/api/enroll/word/${item._id}`,
                              "_blank"
                            )
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Word
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteStudent(item._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= MODAL ================= */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 max-w-3xl w-full rounded shadow-lg overflow-auto max-h-[90vh]">

              <h2 className="text-2xl font-bold mb-5">
                Student Details
              </h2>

              <div className="flex gap-5">

                <img
                  src={`http://localhost:5000/uploads/${selected.photo}`}
                  className="w-32 h-40 object-cover border"
                  alt="student"
                />

                <div className="space-y-2">
                  <p><b>Name:</b> {selected.name}</p>
                  <p><b>DOB:</b> {selected.dob}</p>
                  <p><b>Gender:</b> {selected.gender}</p>
                  <p><b>Contact:</b> {selected.contact}</p>
                  <p><b>Course:</b> {selected.selectedCourse}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <p><b>Father:</b> {selected.fatherName}</p>
                <p><b>Mother:</b> {selected.motherName}</p>
                <p><b>Address:</b> {selected.presentAddress}</p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-6 bg-gray-700 text-white px-5 py-2 rounded"
              >
                Close
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
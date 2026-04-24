import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    await updateDoc(doc(db, "users", id), {
      approved: true,
    });
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      {users.map((user) => (
        <div key={user.id} className="border p-2 mt-2">
          <p>{user.email}</p>
          <p>Status: {user.approved ? "Approved" : "Pending"}</p>

          {!user.approved && (
            <button
              onClick={() => approveUser(user.id)}
              className="bg-green-500 text-white px-2 py-1 mt-1"
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
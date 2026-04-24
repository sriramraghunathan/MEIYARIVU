import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ADMIN_EMAIL } from "../config";
import logo from "../assets/mei1.jpeg"; // ✅ your logo

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;
      const isAdmin = user.email === ADMIN_EMAIL;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        approved: isAdmin ? true : false,
        role: isAdmin ? "admin" : "user",
        createdAt: new Date(),
      });

      alert(
        isAdmin
          ? "Admin account created"
          : "Registered! Wait for admin approval"
      );

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* 🔥 Logo + Heading */}
        <div className="auth-logo">
          <img
            src={logo}
            className="w-24 h-20 mx-auto block rounded-2xl mt-4"
            alt="Logo"
          />
          <h2 className="text-center text-xl font-bold mt-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Join your மெய்யறிவு platform
          </p>
        </div>

        {/* ❌ Error */}
        {error && (
          <div className="error-msg text-center text-red-500 mt-2">
            {error}
          </div>
        )}

        {/* 🔐 Form */}
        <form onSubmit={handleRegister}>
          <div className="form-group mt-3">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              placeholder="you@email.com"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="form-group mt-2">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block mt-4"
          >
            Register →
          </button>
        </form>

        {/* 🔗 Footer */}
        <div className="auth-footer text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login here
          </a>
        </div>

      </div>
    </div>
  );
}
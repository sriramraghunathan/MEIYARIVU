import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import logo from "../assets/mei1.jpeg";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Email Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;

      // ✅ Save name
      await updateProfile(user, {
        displayName: form.name,
      });

      login(user, user.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  // 🔹 Google Register
  const handleGoogleRegister = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      login(user, user.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img
            src={logo}
            className="w-24 h-20 mx-auto block rounded-2xl mt-4"
            alt="Logo"
          />
          <h2>Create Account</h2>
          <p>Join thousands of TNPSC aspirants</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              placeholder="Your full name"
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              placeholder="10-digit mobile number"
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              placeholder="Min 6 characters"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            style={{ marginTop: 8 }}
          >
            Create Account →
          </button>
        </form>

        {/* 🔥 Google Register */}
        <button
          onClick={handleGoogleRegister}
          className="btn btn-google btn-lg btn-block"
          style={{
            marginTop: 10,
            background: "#fff",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          Continue with Google
        </button>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}
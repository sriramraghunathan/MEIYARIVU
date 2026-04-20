import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import logo from "../assets/mei1.jpeg";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;
      login(user, user.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      login(user, user.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google login failed");
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
          <h2>Welcome Back</h2>
          <p>Login to your மெய்யறிவு account</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
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
            className="btn btn-primary btn-lg btn-block"
            style={{ marginTop: 8 }}
          >
            Login →
          </button>
        </form>

        {/* 🔥 Google Login Button */}
        <button
          onClick={handleGoogleLogin}
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
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
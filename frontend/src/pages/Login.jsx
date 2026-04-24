import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider, db } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ADMIN_EMAIL } from "../config";
import logo from "../assets/mei1.jpeg";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 UX improvement
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Email Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("User not registered properly");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();

      if (!userData.approved) {
        setError("Admin approval required");
        setLoading(false);
        return;
      }

      login(user, user.accessToken, userData);
      navigate(userData.role === "admin" ? "/admin" : "/dashboard");

    } catch (err) {
      setError(err.message || "Login failed");
    }

    setLoading(false);
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const isAdmin = user.email === ADMIN_EMAIL;

        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          approved: isAdmin ? true : false,
          role: isAdmin ? "admin" : "user",
          createdAt: new Date(),
        });

        if (!isAdmin) {
          setError("Waiting for admin approval");
          setLoading(false);
          return;
        }
      }

      const userData = (await getDoc(userRef)).data();

      if (!userData.approved) {
        setError("Your account is not approved by admin yet");
        setLoading(false);
        return;
      }

      login(user, user.accessToken, userData);
      navigate(userData.role === "admin" ? "/admin" : "/dashboard");

    } catch (err) {
      setError(err.message || "Google login failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* 🔥 Logo */}
        <div className="auth-logo">
          <img
            src={logo}
            className="w-24 h-20 mx-auto block rounded-2xl mt-4"
            alt="Logo"
          />
          <h2 className="text-center mt-2 text-xl font-bold">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Login to your மெய்யறிவு account
          </p>
        </div>

        {/* ❌ Error */}
        {error && (
          <div className="text-red-500 text-center mt-2">
            {error}
          </div>
        )}

        {/* 🔐 Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label className="form-label">Email</label>
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
            className="btn btn-primary btn-lg btn-block mt-4 w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        {/* 🔥 Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-3 w-full border p-2 rounded bg-white hover:bg-gray-100"
        >
          Continue with Google
        </button>

        {/* 🔗 Footer */}
        <div className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
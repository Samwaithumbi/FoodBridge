import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);

      const res = await loginUser(formData);

      const { token, role, user } = res.data;

      // Persist auth
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));

      toast.success("Login successful");

      // Role-based navigation
      switch (role?.toLowerCase()) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "donor":
          navigate("/donor-dashboard");
          break;
        default:
          navigate("/beneficiary-dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-500">
            <span className="text-amber-900">Food</span>
            <span className="text-green-500">Bridge</span>
          </h1>
          <p className="text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

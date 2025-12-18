import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../axios"; // centralized axios instance

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // API call directly in JSX
      await api.post("/api/auth/register", { name, email, password, role });

      toast.success("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-500">
            <span className="text-amber-900">Food</span>
            <span className="text-green-500">Bridge</span>
          </h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/* Role */}
          <div>
            <p className="block text-sm font-semibold text-gray-700 mb-2">
              Select Your Role
            </p>
            <div className="flex gap-4">
              {["Donor", "Beneficiary"].map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2 w-1/2 justify-center ${
                    formData.role === option
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option}
                    checked={formData.role === option}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

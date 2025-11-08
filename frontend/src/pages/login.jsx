import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]= useState(false)
  const [isLoading, setIsLoading]=useState(false)
  const [formData, setFormData]=useState({
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError(false)


    if(!formData.email || !formData.password){
      return setError("Field inputs are required")
    }

    try {
      setIsLoading(true)

      const res =await axios.post("http://localhost:3000/api/auth/login", formData)
      localStorage.setItem("userData",JSON.stringify(res.data))
      localStorage.setItem("token", res.data.token)
      console.log(res.data);
      if (res.status === 200 && res.data.role =="donor" ) {
        alert("Logged in successful")
        navigate("/donor-dashboard")
      }else{
        navigate('/beneficiary-dashboard')
      }

    } catch (err) {
      setError(err.response?.data?.message || "Logging in failed. Try again.");
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Logo / Title */}
        <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-amber-500">
            <span className="text-amber-900">Food</span>
            <span className="text-green-500">Bridge</span>
        </h1>
          <p className="text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg p-2 mb-3 text-center">
            {error}
          </div>
        )}


        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 outline-none"
              onChange={handleChange}
              value={formData.email}
              autoComplete="true"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 outline-none pr-10"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {/* Toggle visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-600"
            >
              {showPassword ? <FaEye className="mt-7" size={20}/> : <FaEyeSlash className="mt-7" size={20}/>}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" id="remember-me" name="remember-me" className="accent-green-600" /> Remember me
            </label>
            <a href="#" className="text-green-600 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-sm hover:shadow-md disabled:opacity-70"
          >
            {isLoading ? "Sign in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

      

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

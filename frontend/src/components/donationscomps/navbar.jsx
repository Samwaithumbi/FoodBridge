import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NotificationBell from "../notificationsComps/notificationIcon";

const Nav = ({username,userId}) => {
  const navigate = useNavigate()

  const handleProfile =()=>{
    navigate('/profile')
  }

  //handle logout
  const handleLogout = ()=>{
    localStorage.clear('userData')
    navigate('/login')
    toast.success('Logged out');
  }

    return ( 
     <>
      <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold">
              <span className="text-amber-900">Food</span>
              <span className="text-green-500">Bridge</span>
            </h1>
          </div>

          {/* Profile and Logout */}
          <div className="flex items-center gap-4">
            {/* Profile Section */}
            <div 
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
              onClick={handleProfile}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold border-2 border-amber-200">
                p
              </div>
              <span className="text-lg font-semibold text-gray-800 hidden sm:block">
                {username}
              </span>
            </div>
            <NotificationBell/>

            {/* Logout Button */}
            <button 
              className="px-4 py-2 text-base font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
        </>
     );
}
 
export default Nav;
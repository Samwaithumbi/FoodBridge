import { useEffect, useState } from "react";
import { Edit3, Mail, MapPin, Phone, Globe } from "lucide-react";
import axios from "axios";

const ProfileView = ({userProfile, setUserProfile, setIsEditing})=> {
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const fetchUserProfile = async()=>{
   try {
    const res = await axios.get('http://localhost:3000/api/auth/myprofile', {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    setUserProfile(res.data)
    console.log(res.data);
   } catch (error) {
    console.log(error.message);
   }
    }
    fetchUserProfile()
  },[token])


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full relative">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-300" />
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
          <button 
          onClick={()=>setIsEditing(true)}
          className="mt-3 px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

     <div className="flex">
      <div className="mt-24 max-w-6xl w-full grid md:grid-cols-3 gap-6 px-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
          <p className="text-sm text-gray-500 mb-4">
            Your personal details and contact information
          </p>
          <div className="space-y-4">
            <div>
              <p className=" text-lg font-semibold">Full Name</p>
              <p >{userProfile.username}</p>
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-lg font-semibold"><Mail className="w-4 h-4 text-gray-500" />Email</p>
              <p className="text-lg">{userProfile.email}</p>
            </div>
            <div className="space-y-4">
             <p className="flex  items-center gap-2 text-lg font-semibold"> <Phone className="w-4 h-4 text-gray-500" />Phone Number</p>
              <p className="text-sm">{userProfile.phone || "Edit to provide phone number"}</p>
            </div>
            <div className="space-y-4">
             <p className="flex  items-center gap-2 text-lg font-semibold"> <Phone className="w-4 h-4 text-gray-500" />Role</p>
              <p className="text-sm">{userProfile.role}</p>
            </div>
          </div>
        </div>

       <div className="flex flex-col">
        {/* Location & Links */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <p className="text-sm">{userProfile.location || "Edit the location"}</p>
            </div>
            
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl w-full mt-6 px-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <p className="text-gray-500 text-sm mb-4">
            Member Since
          </p>
          <p>{new Date(userProfile.createdAt).toLocaleDateString('en-US', {
             year: "numeric",
             month: "long",
          })}</p>
          <p>Status</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Active
          </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default ProfileView

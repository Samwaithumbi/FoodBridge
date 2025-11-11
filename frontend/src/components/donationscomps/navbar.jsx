import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
           <div className="flex  items-center gap-3 justify-end ">
            <div className="flex items-center gap-2 p-2 hover:bg-amber-100 cursor-pointer" onClick={handleProfile}>
              <img src="hero.png" 
                className="h-[50px] w-[50px] rounded-[50%]"

              alt="profilepic" />
              <p className="text-xl font-bold">{username}</p>
            </div>
             <button 
                className="text-xl p-1.5 font-semibold hover:bg-orange-600 hover:text-amber-50 rounded-2xl"
               onClick={handleLogout}
             >Logout</button>
           </div>
        </>
     );
}
 
export default Nav;
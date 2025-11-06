import EditProfile from "@/components/profilecomps/editProfile";
import ProfileView from "@/components/profilecomps/profileView";
import { useState } from "react";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profilePic:""
  });

  const [isEditing, setIsEditing]= useState(false)
  return ( 
   <>
     {isEditing? (
      <EditProfile userProfile={userProfile} setUserProfile={setUserProfile} setIsEditing={setIsEditing}/>
     ):(
      <ProfileView userProfile={userProfile} setUserProfile={setUserProfile} setIsEditing={setIsEditing}/>
     )}
   </>
   );
}
 
export default ProfilePage;
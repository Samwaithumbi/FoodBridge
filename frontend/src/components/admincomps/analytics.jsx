import axios from "axios";
import { useEffect } from "react";
import { LuUsers } from "react-icons/lu";

const Analytics = ({users, setUsers, allDonations, setAllDonations, availableDonations, setAvailableDonations, requests, setRequests}) => {
   const token = localStorage.getItem('token')
  //fetching users
  useEffect(()=>{
   async function fetchingUsers(){
      try {
        const res =await axios.get("http://localhost:3000/api/auth/users")
      setUsers(res.data);
     
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchingUsers()
  }, [])
  
//fetching donations
useEffect(()=>{
  async function fetchingDonations(){
     try {
       const res =await axios.get("http://localhost:3000/api/donations/all-donations")
     setAllDonations(res.data.donations);
     } catch (error) {
       console.log(error.message);
     }
   }
   fetchingDonations()
 }, [])

 //fetching aailable donations
 useEffect(()=>{
  async function fetchingAvailableDonations(){
     try {
       const res =await axios.get("http://localhost:3000/api/donations/available-donations")
     setAvailableDonations(res.data.donations);
     } catch (error) {
       console.log(error.message);
     }
   }
   fetchingAvailableDonations()
 }, [])

 //fetching requests
 useEffect(()=>{
  async function fetchingPendingRequests(){
     try {
       const res =await axios.get("http://localhost:3000/api/requests/pending-requests", {
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
     setRequests(res.data);
     console.log(res.data);
     } catch (error) {
       console.log(error.message);
     }
   }
   fetchingPendingRequests()
 }, [token])

    return ( 
        <>
          <div className="grid md:grid-cols-4 gap-4 justify-center mt-4">
            <div className="card ">
             <div>
                 <LuUsers size={50} className="bg-blue-500 p-2 rounded-lg"/>
                <h2>{users.length}</h2>
                <p>Total Users</p>
             </div>
            </div>
            <div className="card">
                <h2>{allDonations.length}</h2>
                <p>Total Donations</p>
            </div>
            <div className="card">
                <h2>{availableDonations.length}</h2>
                <p>Active Donations</p>
            </div>
            <div className="card">
                <h2>{requests.length}</h2>
                <p>Pending Requests</p>
            </div>
         </div>
        </>
     );
}
 
export default Analytics;
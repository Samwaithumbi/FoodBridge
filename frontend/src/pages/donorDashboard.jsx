import DonorWelcome from "@/components/donationscomps/donar-welcome"
import Stats from "@/components/donationscomps/stats"
import Donations from "@/components/donationscomps/donationLists"
import Nav from "@/components/donationscomps/navbar"
import { useState } from "react"

export default function Layout() {
  const [donations, setDonations]=useState({
    title: "",
    description: "",
    image: "",
    location: "",
    expiryDate: "",
  })

  const userId = localStorage.getItem("userId") 
  const name = localStorage.getItem("userName") 
  return (
  <>
    <main >
        <div >
          <Nav name={name} userId={userId}/>
        </div>

        <section >
          <DonorWelcome  donations={donations} setDonations={setDonations} name={name} />
        </section>
        <section className="mb-6">
          <Stats donations={donations}/>
        </section>
        <section>
          <Donations donations={donations} setDonations={setDonations}/>
        </section>
      </main>
  
  </>
  )
}
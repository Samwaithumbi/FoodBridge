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

  const userData=JSON.parse(localStorage.getItem("userData"))
  return (
  <>
    <main >
        <div >
          <Nav name={userData.name} userId={userData.userId}/>
        </div>

        <section >
          <DonorWelcome  donations={donations} setDonations={setDonations} name={userData.name} />
        </section>
        <section className="mb-6">
          <Stats />
        </section>
        <section>
          <Donations donations={donations} setDonations={setDonations}/>
        </section>
      </main>
  
  </>
  )
}
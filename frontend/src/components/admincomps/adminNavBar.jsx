const AdminNavBar = ({ adminNav, setAdminNav }) => {
   const menu = [
     { id: "users", label: "Users" },
     { id: "donations", label: "Donations" },
   ];
 
   return (
     <div className="mt-2">
       <div className="flex gap-6 border border-amber-950 p-3 rounded-2xl w-[250px]">
         {menu.map((item) => (
           <button
             key={item.id}
             onClick={() => setAdminNav(item.id)}
             className={`px-3 py-1 rounded-xl transition 
               ${adminNav === item.id ? "bg-amber-950 text-white" : "hover:text-amber-700"}`}
           >
             {item.label}
           </button>
         ))}
       </div>
     </div>
   );
 };
 
 export default AdminNavBar;
 
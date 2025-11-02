const Nav = () => {
    return ( 
        <>
           <div className="flex items-center gap-3">
             <img src="hero.png" 
               className="h-[50px] w-[50px] rounded-[50%]"

             alt="profilepic" />
             <p>Sam</p>
             <button className="text-xl p-1.5 font-semibold hover:bg-amber-800 rounded-2xl ">Logout</button>
           </div>
        </>
     );
}
 
export default Nav;
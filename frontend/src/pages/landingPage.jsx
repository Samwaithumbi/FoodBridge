import Footer from "../components/langingpageComps/footer";
import Hero from "../components/langingpageComps/hero";
import NavBar from "../components/langingpageComps/navbar";

const LandingPage = () => {
    return ( 
        <div className="m-3">
            <NavBar/>
            <Hero/>
            <Footer/>
        </div>
     );
}
 
export default LandingPage;
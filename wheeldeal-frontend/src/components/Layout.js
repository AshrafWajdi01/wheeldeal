import Navbar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import './Landing/Landing.css'

const Layout = ({ children }) => {
    return (
        <div className="landing">  
            <Navbar />

            <div className="overlay"> 
                {children} 
            </div>

            <Footer />
        </div>
    );
};

export default Layout;
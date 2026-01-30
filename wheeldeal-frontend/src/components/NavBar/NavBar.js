import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const image = localStorage.getItem("image");
        
        if (jwt && email) {
            setUser({ email, name, image });
        }
    }, []);

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("jwt");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("image");
        setUser(null);
        alert("Logged out successfully");
    };

    const handleNavClick = (path) => {
        if (!user) {
            alert('Log In to View Content');
            return;
        }
        navigate(path);
    }

    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <nav className="navbar">
            <div className="nav-left">
                <span className="logo" onClick={()=>navigate('/')}>WheelDeal</span>
            </div>

            <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`nav-center ${menuOpen ? "active" : ""}`}>
                <ul className="nav-links">
                    <li onClick={()=>navigate('/')}>Home</li>
                    <li onClick={()=>handleNavClick('/BuyCar')}>Buy Cars</li>
                    <li onClick={()=>handleNavClick('/SellCar')}>Sell Cars</li>
                    <li onClick={()=>handleNavClick('/AboutUs')}>About Us</li>
                </ul>
            </div>

            <div className="nav-right">
                {!user ? (
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const idToken = credentialResponse.credential;
                            fetch('http://localhost:8080/auth/google', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ idToken }),
                            })
                            .then(res => res.json())
                            .then(data => {
                                localStorage.setItem('jwt', data.jwt);
                                localStorage.setItem('email', data.email);
                                localStorage.setItem('name', data.name);
                                localStorage.setItem('image', data.image);
                                setUser({ 
                                    email: data.email, 
                                    name: data.name,
                                    image: data.image 
                                });
                                if (!data.phone || !data.location) {
                                    navigate('/EditProfile', { replace: true });
                                }
                            })
                            .catch(err => {
                                console.error('Login error:', err);
                                alert('Login failed. Please try again.');
                            });
                        }}
                        onError={() => alert('Google login failed')}
                    />
                ) : (
                    <div className="user-dropdown">
                        <img src={user.image} alt={user.name} className="user-avatar" />
                        <span>{user.name}</span>

                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => navigate("/ViewProfile")}>View Profile</div>
                            <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

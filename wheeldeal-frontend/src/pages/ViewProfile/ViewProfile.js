import { useNavigate } from "react-router-dom";
import './ViewProfile.css';

function ViewProfile() {
    const navigate = useNavigate();

    const user = {
        name: localStorage.getItem("name") || "",
        email: localStorage.getItem("email") || "",
        phone: localStorage.getItem("phone") || "",
        location: localStorage.getItem("location") || "",
        image: localStorage.getItem("image") || ""
    };

    return (
        <div className="view-profile-page">
            <div className="view-profile-card">
                {user.image && (
                    <img src={user.image} alt={user.name} className="profile-avatar"/>
                )}
                <h2>{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
                <p><strong>Location:</strong> {user.location || "Not set"}</p>

                <button onClick={() => navigate("/EditProfile")}>Edit Profile</button>
            </div>
        </div>
    );
}

export default ViewProfile;

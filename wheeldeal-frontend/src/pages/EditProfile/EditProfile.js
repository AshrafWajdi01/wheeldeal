import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditProfile.css'

function EditProfile() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        phone: localStorage.getItem("phone") || "",
        location: localStorage.getItem("location") || ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jwt = localStorage.getItem("jwt");

        const res = await fetch("http://localhost:8080/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            localStorage.setItem("phone", form.phone);
            localStorage.setItem("location", form.location);
            alert("Profile updated!");
            navigate("/ViewProfile");
        } else {
            alert("Failed to update profile");
        }
    };

    return (
        <div className="edit-profile-page">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <h2>Please Complete Your Profile</h2>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;

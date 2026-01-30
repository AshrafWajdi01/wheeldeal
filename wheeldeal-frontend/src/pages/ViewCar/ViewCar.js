import React, { useState } from "react";
import "./ViewCar.css";

function ViewCar({ car, goBack }) {
    const images = car.imageUrl ? JSON.parse(car.imageUrl) : [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sellerPhone, setSellerPhone] = useState(null);

    const prevImage = () => {
        setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1));
    };

    const nextImage = () => {
        setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));
    };

    const fetchSellerPhone = async () => {
        if (!car.userId) {
            alert("Seller info not available");
            return;
        }

        try {
            // CORRECTED: Use regular parentheses ( ) not backticks ` `
            const res = await fetch(`http://localhost:8080/users/${car.userId}`);
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Fetched user data:", data); // Debug log
            
            setSellerPhone(data.phone || "No phone number found");
        } catch (err) {
            console.error("Error fetching seller info:", err);
            alert("Failed to fetch seller info: " + err.message);
        }
    };

    const daysAgo = Math.floor(
        (new Date() - new Date(car.createdAt)) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="view-car-container">
            <div className="view-car-card">
                <div className="image-section">
                    <img src={images[currentIndex]} alt="Car" />
                    {images.length > 1 && (
                        <>
                            <button className="slider-btn prev" onClick={prevImage}>‹</button>
                            <button className="slider-btn next" onClick={nextImage}>›</button>
                        </>
                    )}
                </div>

                <div className="details-section">
                    <div className="details-content">
                        <h2>{car.brand} {car.model}</h2>
                        <div className="meta">
                            {car.year} • {car.transmission}
                        </div>
                        <div className="location">📍 {car.location}</div>
                        <div className="price">
                            RM {car.price.toLocaleString()}
                        </div>
                        <div className="extra">
                            Mileage: {car.mileage.toLocaleString()} km
                        </div>
                        <div className="extra">
                            Listed: {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                        </div>
                        {car.description && (
                            <div className="description">
                                {car.description}
                            </div>
                        )}
                    </div>

                    <div className="action-row">
                        <button className="back-btn" onClick={goBack}>Back</button>
                        <button className="contact-btn" onClick={fetchSellerPhone}>
                            Contact Seller
                        </button>
                    </div>

                    {sellerPhone && (
                        <div className="seller-phone">
                            📞 {sellerPhone}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewCar;
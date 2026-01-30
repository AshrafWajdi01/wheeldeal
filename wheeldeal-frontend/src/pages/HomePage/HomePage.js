import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import ViewCar from "../ViewCar/ViewCar";

function HomePage() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/cars")
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched cars:", data);
            setCars(data);
        })
        .catch((err) => console.error("Error fetching cars:", err));
    }, []);

    const [selectedCar,setSelectedCar] = useState(null);
    const handleCardClick = (car) => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
        alert("Log In to view content");
        return;
        }
        console.log("Car clicked:", car);
        setSelectedCar(car);
    };

    const getFirstImage = (imageUrl) => {
        try {
        if (!imageUrl) return "https://via.placeholder.com/400x250?text=No+Image";
        const images = JSON.parse(imageUrl);
        return images[0] || "https://via.placeholder.com/400x250?text=No+Image";
        } catch (e) {
        return imageUrl;
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: cars.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: cars.length > 1,
        autoplaySpeed: 4000,
        arrows: true,
    };

    return (
        <>
            {selectedCar ? (
                <ViewCar car={selectedCar} goBack={() => setSelectedCar(null)} />
            ) : (
                <div className="home-page">
                    <div className="home-form">
                        <div className="welcome-section">
                            <div className="home-logo-container">
                                <div className="home-logo"></div>
                            </div>
                            <div className="welcome-text">
                                <h2>WheelDeal</h2>
                                <p>Your trusted platform to buy and sell cars easily and safely.</p>
                            </div>
                        </div>

                        <div className="car-slider">
                        {cars.length === 0 ? (
                            <p>Loading cars...</p>
                        ) : (
                            <Slider {...sliderSettings}>
                            {cars.map((car) => (
                                <div key={car.id}>
                                    <div
                                        className="car-slide"
                                        onClick={() => handleCardClick(car)}
                                    >
                                        <img 
                                        src={getFirstImage(car.imageUrl)} 
                                        alt={`${car.brand} ${car.model}`}
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/400x250?text=Image+Not+Found";
                                        }}
                                        />
                                        <div className="car-info">
                                            <h4>{car.brand} {car.model}</h4>
                                            <p>Year: {car.year}</p>
                                            <p>Price: RM {car.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </Slider>
                        )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HomePage;
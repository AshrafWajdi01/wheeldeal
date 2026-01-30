import React, { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import "./CarList.css";

function CarList() {
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

    const handleCardClick = (car ) => {
        const jwt = localStorage.getItem('jwt');

        if ( !jwt) {
            alert ("You need to login first!");
            return;
        }

        console.log("Car clicked:", car);
    }

    return (
        <div className="car-list-container">
        {cars.length === 0 ? (
            <p>Loading cars...</p>
        ) : (
            <div className='car-list'>
                {cars.map(car => (
                    <CarCard
                        key={car.id}
                        car={car}
                        onClick={() => handleCardClick(car)}
                    />
                ))}
            </div>
        )}
        </div>
    );
}

export default CarList;

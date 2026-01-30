import React from 'react';
import './CarCard.css';

function CarCard({ car, onClick }) {
    const images = car.imageUrl ? JSON.parse(car.imageUrl) : [];
    
    const handleClick = () => {
        if (!onClick) return;
        onClick();
    }
    return (
        <div className='car-card' onClick={handleClick}>
            <img src={images[0]} alt={`${car.brand} ${car.model}`} className='car-image' />
            <div className='car-info'>
                <h3>{car.brand} {car.model}</h3>
                <p>Price: RM{car.price}</p>
            </div>
        </div>
    );
}

export default CarCard;
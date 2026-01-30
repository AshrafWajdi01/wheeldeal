import React, { useState, useEffect } from 'react';
import './SellCar.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SellCar() {
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [form, setForm] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        transmission: "",
        description: ""
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const phone = localStorage.getItem('phone');
        const location = localStorage.getItem('location');
        if (!phone || !location) {
            navigate('/EditProfile', { replace: true });
        }
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/cars")
        .then(res => res.json())
        .then(data => setCars(data))
        .catch(err => console.error("Error fetching cars:", err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem("jwt");
        if (!jwt) { alert("Please Log In first!"); return; }

        setLoading(true);
        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        images.forEach(img => formData.append('image_url', img));

        try {
            const res = await fetch('http://localhost:8080/cars/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${jwt}` },
                body: formData
            });
            if (res.ok) {
                alert('Car listed for sale successfully!');
                setForm({ brand:"", model:"", year:"", price:"", mileage:"", transmission:"", description:"" });
                setImages([]);
            } else {
                const errorText = await res.text();
                console.error('Server error:', errorText);
                alert('Failed to list car: ' + errorText);
            }
        } catch (err) {
            console.error(err);
            alert('Error: ' + err.message);
        } finally { setLoading(false); }
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 2000,           
        slidesToShow: 4,       
        slidesToScroll: 1,     
        autoplay: true,
        autoplaySpeed: 0,      
        cssEase: "linear",     
        arrows: false
    };


    const getFirstImage = (imageUrl) => {
        try {
            if (!imageUrl) return "https://via.placeholder.com/200x120?text=No+Image";
            const images = JSON.parse(imageUrl);
            return images[0] || "https://via.placeholder.com/200x120?text=No+Image";
        } catch {
            return imageUrl;
        }
    };

    return (
        <>
            {loading && (
                <div className='loader-overlay'>
                    <div className='spinner'></div>
                </div>
            )}

            <div className="sell-car-page">
                <form className='sell-car-form' onSubmit={handleSubmit}>
                    <h2>Sell Your Car With Us!</h2>
                    <div className="trust-slider">
                        {cars.length > 0 && (
                            <Slider {...sliderSettings}>
                                {cars.map(car => (
                                    <div key={car.id} className="trust-slide">
                                        <img src={getFirstImage(car.imageUrl)} alt={`${car.brand} ${car.model}`} />
                                        <div className="trust-info">
                                            <p>{car.brand} {car.model}</p>
                                            <p>RM {car.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                    <p className="trust-caption">Our Trusted Cars in Action</p>
                    <div className="form-grid">
                        <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required />
                        <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
                        <input type="number" name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
                        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                        <input type="number" name="mileage" placeholder="Mileage (km)" value={form.mileage} onChange={handleChange} required />
                        <input type="text" name="transmission" placeholder="Transmission" value={form.transmission} onChange={handleChange} required />
                        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                        <input type="file" multiple onChange={handleImageChange} />
                    </div>
                    <button type="submit">List Car for Sale</button>
                </form>
            </div>
        </>
    );
}

export default SellCar;

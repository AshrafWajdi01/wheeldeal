import React, { useEffect, useState } from "react";
import ViewCar from "../ViewCar/ViewCar";
import "./BuyCar.css";

function BuyCar() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Filter states
    const [filters, setFilters] = useState({
        brands: [],
        transmissions: [],
        locations: [],
        minPrice: "",
        maxPrice: ""
    });

    // Get unique values for filters
    const [availableBrands, setAvailableBrands] = useState([]);
    const [availableTransmissions, setAvailableTransmissions] = useState([]);
    const [availableLocations, setAvailableLocations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/cars")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched cars:", data);
                setCars(data);
                setFilteredCars(data);
                
                // Extract unique brands, transmissions, and locations
                const brands = [...new Set(data.map(car => car.brand))].sort();
                const transmissions = [...new Set(data.map(car => car.transmission))].filter(Boolean).sort();
                const locations = [...new Set(data.map(car => car.location))].filter(Boolean).sort();
                
                setAvailableBrands(brands);
                setAvailableTransmissions(transmissions);
                setAvailableLocations(locations);
            })
            .catch((err) => console.error("Error fetching cars:", err));
    }, []);

    // Apply filters whenever search or filters change
    useEffect(() => {
        let result = [...cars];

        // Search filter (case insensitive)
        if (searchTerm) {
            result = result.filter(car => 
                car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (car.description && car.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Brand filter
        if (filters.brands.length > 0) {
            result = result.filter(car => filters.brands.includes(car.brand));
        }

        // Transmission filter
        if (filters.transmissions.length > 0) {
            result = result.filter(car => filters.transmissions.includes(car.transmission));
        }

        // Location filter
        if (filters.locations.length > 0) {
            result = result.filter(car => filters.locations.includes(car.location));
        }

        // Price filter
        if (filters.minPrice) {
            result = result.filter(car => car.price >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            result = result.filter(car => car.price <= parseFloat(filters.maxPrice));
        }

        setFilteredCars(result);
    }, [searchTerm, filters, cars]);

    const handleBrandChange = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const handleTransmissionChange = (transmission) => {
        setFilters(prev => ({
            ...prev,
            transmissions: prev.transmissions.includes(transmission)
                ? prev.transmissions.filter(t => t !== transmission)
                : [...prev.transmissions, transmission]
        }));
    };

    const handleLocationChange = (location) => {
        setFilters(prev => ({
            ...prev,
            locations: prev.locations.includes(location)
                ? prev.locations.filter(l => l !== location)
                : [...prev.locations, location]
        }));
    };

    const handlePriceChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            brands: [],
            transmissions: [],
            locations: [],
            minPrice: "",
            maxPrice: ""
        });
        setSearchTerm("");
    };

    const [selectedCar, setSelectedCar] = useState(null);
    
    const handleCarClick = (car) => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            alert("You need to login first!");
            return;
        }
        console.log("Car clicked:", car);
        setSelectedCar(car);
    };

    const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);


    return (
        <>
            {selectedCar ? (
                <ViewCar car={selectedCar} goBack={() => setSelectedCar(null)} />
            ) : (
                <div className="buy-car-page">
                    <div className="filter-toggle">
                        <button onClick={() => setIsFilterCollapsed(prev => !prev)}>
                            Filters
                        </button>
                    </div>

                    <div className={`filter-sidebar ${isFilterCollapsed ? 'collapsed' : ''}`}>
                        <div className="filter-header">
                            <h2>FILTERS</h2>
                            <button className="clear-btn" onClick={clearFilters}>Clear All</button>
                        </div>

                        <div className="filter-section">
                            <h3>Search</h3>
                            <input
                                type="text"
                                placeholder="Search brand or model..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-section">
                            <h3>Brand</h3>
                            <div className="filter-options">
                                {availableBrands.map(brand => (
                                    <label key={brand} className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                        />
                                        <span>{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Transmission</h3>
                            <div className="filter-options">
                                {availableTransmissions.map(transmission => (
                                    <label key={transmission} className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.transmissions.includes(transmission)}
                                            onChange={() => handleTransmissionChange(transmission)}
                                        />
                                        <span>{transmission}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Location</h3>
                            <div className="filter-options">
                                {availableLocations.map(location => (
                                    <label key={location} className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.locations.includes(location)}
                                            onChange={() => handleLocationChange(location)}
                                        />
                                        <span>{location}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Price Range (RM)</h3>
                            <div className="range-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                                    className="range-input"
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                                    className="range-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="car-deck-container">
                        <div className="results-header">
                            <h2>Available Cars</h2>
                            <p className="results-count">
                                {filteredCars.length} {filteredCars.length === 1 ? 'result' : 'results'}
                            </p>
                        </div>

                        <div className="car-deck-scroll">
                            {filteredCars.length === 0 ? (
                                <div className="no-results">
                                    <div className="no-results-icon">🚗</div>
                                    <h3>No cars found</h3>
                                    <p>Try adjusting your filters</p>
                                    <button onClick={clearFilters} className="reset-btn">Reset Filters</button>
                                </div>
                            ) : (
                                <div className='car-grid'>
                                    {filteredCars.map(car => {
                                        const images = car.imageUrl ? JSON.parse(car.imageUrl) : [];
                                        
                                        return (
                                            <div 
                                                key={car.id} 
                                                className="car-item"
                                                onClick={() => handleCarClick(car)}
                                            >
                                                <div className="car-image">
                                                    {images.length > 0 ? (
                                                        <img 
                                                            src={images[0]} 
                                                            alt={`${car.brand} ${car.model}`}
                                                        />
                                                    ) : (
                                                        <div className="car-placeholder">
                                                            <span>🚗</span>
                                                        </div>
                                                    )}
                                                    <div className="car-price-overlay">
                                                        RM {car.price?.toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="car-details">
                                                    <div className="car-name">
                                                        {car.brand} {car.model}
                                                    </div>
                                                    <div className="car-inf">
                                                        {car.year} • {car.transmission}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BuyCar;
import React, { useState } from 'react';

function UploadCar(){
    const [ brand, setBrand ] = useState('');
    const [ model, setModel ] = useState('');
    const [ year, setYear ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ images, setImages ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('year', year);
        formData.append('price', price);
        formData.append('description', description);
        for (let img of images) formData.append('image_url', img);

        try{
            const res = await fetch('http://localhost:8080/cars/upload', {
                method: 'POST',
                body: formData
            });
            if(res.ok){
                alert('Car uploaded successfully!');
            } else {
                alert('Failed to upload car.');
            }
        } catch(error){
            console.error('Error uploading car:', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Upload Car</h2>
            <input type="text" placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} required />
            <input type="text" placeholder="Model" value={model} onChange={e=>setModel(e.target.value)} required />
            <input type="number" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required></textarea>
            <input type="file" multiple onChange={e=>setImages(e.target.files)} required />
            <button type="submit">Upload</button>
        </form>
    )
}

export default UploadCar;
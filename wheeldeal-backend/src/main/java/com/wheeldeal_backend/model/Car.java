package com.wheeldeal_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private String brand;
    private String model;
    private int year;
    private double price;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    private int is_preloaded;
    private LocalDateTime created_at = LocalDateTime.now();

    private String transmission;
    private int mileage;
    private String location;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public Long getUserId(){
        return user_id;
    }

    public void setUserId(Long user_id){
        this.user_id=user_id;
    }

    public String getBrand(){
        return brand;
    }

    public void setBrand(String brand){
        this.brand=brand;
    }

    public String getModel(){
        return model;
    }

    public void setModel(String model){
        this.model=model;
    }

    public int getYear(){
        return year;
    }

    public void setYear(int year){
        this.year=year;
    }

    public double getPrice(){
        return price;
    }

    public void setPrice(double price){
        this.price=price;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getIsPreloaded(){
        return is_preloaded;
    }

    public void setIsPreloaded(int is_preloaded){
        this.is_preloaded=is_preloaded;
    }

    public LocalDateTime getCreatedAt(){
        return created_at;
    }

    public void setCreatedAt(LocalDateTime created_at){
        this.created_at=created_at;
    }

    public String getTransmission(){
        return transmission;
    }

    public void setTransmission(String transmission){
        this.transmission=transmission;
    }

    public int getMileage(){
        return mileage;
    }

    public void setMileage(int mileage){
        this.mileage=mileage;
    }

    public String getLocation(){
        return location;
    }

    public void setLocation(String location){
        this.location=location;
    }
}
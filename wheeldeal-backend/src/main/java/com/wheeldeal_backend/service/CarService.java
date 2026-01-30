package com.wheeldeal_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.wheeldeal_backend.model.Car;
import com.wheeldeal_backend.model.User;
import com.wheeldeal_backend.repository.CarRepository;
import com.wheeldeal_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CarService {
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;

    public CarService(CarRepository carRepository, UserRepository userRepository, Cloudinary cloudinary) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.cloudinary = cloudinary;
    }

    @Transactional
    public Car uploadCar(
        Long user_id,
        String brand,
        String model,
        int year,
        double price,
        String description,
        MultipartFile[] images,
        String transmission,
        int mileage
    ) throws Exception {
        // Fetch user's location from database
        User user = userRepository.findById(user_id)
            .orElseThrow(() -> new Exception("User not found"));
        
        String userLocation = user.getLocation();

        List<String> imageUrls = new ArrayList<>();
        
        for(MultipartFile image : images){
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                image.getBytes(),
                ObjectUtils.emptyMap()
            );
            imageUrls.add(uploadResult.get("secure_url").toString());
        }

        String imageUrlString = 
        "[" +
            imageUrls.stream()
                .map(url -> "\"" + url + "\"")
                .reduce((a, b) -> a + "," + b)
                .orElse("") +
        "]";

        Car car = new Car();
        car.setUserId(user_id);
        car.setBrand(brand);
        car.setModel(model);
        car.setYear(year);
        car.setPrice(price);
        car.setDescription(description);
        car.setImageUrl(imageUrlString);  
        car.setIsPreloaded(0);
        car.setCreatedAt(LocalDateTime.now());
        car.setTransmission(transmission);
        car.setMileage(mileage);
        car.setLocation(userLocation); 

        return carRepository.save(car);
    }
}
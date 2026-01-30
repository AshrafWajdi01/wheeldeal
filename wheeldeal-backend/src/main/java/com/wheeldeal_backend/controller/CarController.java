package com.wheeldeal_backend.controller;

import com.wheeldeal_backend.model.Car;
import com.wheeldeal_backend.service.CarService;
import com.wheeldeal_backend.repository.CarRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.wheeldeal_backend.security.JwtUtil;

import java.util.List;
@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {
    private final CarRepository carRepository;
    private final CarService carService;

    public CarController(CarRepository carRepository, CarService carService) {
        this.carRepository = carRepository;
        this.carService = carService;
    }

    @GetMapping
    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    @PostMapping("/upload")
    public Car uploadCar(
        @RequestHeader("Authorization") String AuthHeader,
        @RequestParam("brand") String brand,
        @RequestParam("model") String model,
        @RequestParam("year") int year,
        @RequestParam("price") double price,
        @RequestParam(value = "description", required=false) String description,
        @RequestParam("image_url") MultipartFile[] image_url,
        @RequestParam(value = "transmission", required=false) String transmission,
        @RequestParam(value = "mileage", required=false) int mileage
    ) throws Exception {
        String token = AuthHeader.replace("Bearer ", "");
        Long user_id = JwtUtil.getUserId(token);
        return carService.uploadCar(user_id, brand, model, year, price, description, image_url, transmission, mileage);
    }
}
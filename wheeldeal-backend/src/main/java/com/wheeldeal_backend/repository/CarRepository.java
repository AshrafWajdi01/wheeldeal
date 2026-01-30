package com.wheeldeal_backend.repository;

import com.wheeldeal_backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c WHERE c.user_id = :userId")
    List<Car> findByUserId(@Param("userId") Long userId);
}
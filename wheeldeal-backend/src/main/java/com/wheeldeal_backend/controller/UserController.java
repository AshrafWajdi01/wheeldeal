package com.wheeldeal_backend.controller;

import com.wheeldeal_backend.model.User;
import com.wheeldeal_backend.repository.UserRepository;
import com.wheeldeal_backend.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PutMapping("/profile")
    public User updateProfile(
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String auth
    ) {
        Long userId = JwtUtil.getUserId(auth.replace("Bearer ", ""));
        
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPhone(body.get("phone"));
        user.setLocation(body.get("location"));

        return userRepo.save(user);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}

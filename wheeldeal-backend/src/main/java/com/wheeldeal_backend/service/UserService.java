package com.wheeldeal_backend.service;

import com.wheeldeal_backend.model.User;
import com.wheeldeal_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOrCreateUser(String email, String name, String image, String googleId) {
        return userRepository.findByEmail(email)
                .map(existingUser -> {
                    if (image != null && !image.equals(existingUser.getImage())) {
                        existingUser.setImage(image);
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setImage(image);
                    newUser.setGoogleId(googleId);
                    newUser.setRole("user");
                    newUser.setCreatedAt(LocalDate.now());
                    return userRepository.save(newUser);
                });
    }
}
package com.wheeldeal_backend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.wheeldeal_backend.model.User;
import com.wheeldeal_backend.service.GoogleService;
import com.wheeldeal_backend.service.JwtService;
import com.wheeldeal_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final GoogleService googleService;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(GoogleService googleService, UserService userService, JwtService jwtService) {
        this.googleService = googleService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        try {
            String idToken = body.get("idToken");
            GoogleIdToken.Payload payload = googleService.verifyToken(idToken);

            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");
            String googleId = payload.getSubject();

            User user = userService.findOrCreateUser(email, name, picture, googleId);

            String jwt = jwtService.generateToken(user);

            return ResponseEntity.ok(Map.of(
                "jwt", jwt, 
                "email", user.getEmail(), 
                "name", user.getName(),
                "image", user.getImage() != null ? user.getImage() : "",
                "phone", user.getPhone(),
                "location", user.getLocation()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(Map.of("error", "Invalid Google token: " + e.getMessage()));
        }
    }
}
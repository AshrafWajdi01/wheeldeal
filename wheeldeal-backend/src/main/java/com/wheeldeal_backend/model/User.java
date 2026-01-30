package com.wheeldeal_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import jakarta.persistence.PrePersist;

@Entity
@Table(name = "users")

public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50, unique = true)
    private String name;
    
    @Column(nullable = false, length = 100, unique = true)
    private String email;
    
    @Column(length = 255)
    private String image;
    
    @Column(length = 20)
    private String role = "user";
    
    @Column(name = "created_at")
    private LocalDate createdAt;
    
    @Column(length = 20)
    private String phone;
    
    @Column(length = 255)
    private String location;
    
    @Column(name = "google_id", length = 255)
    private String googleId;

    @PrePersist
    protected void onCreate() {
        if (this.role == null || this.role.isEmpty()) {
            this.role = "user";
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDate.now();
        }
    }

    public User() {}

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() { 
        return name; 
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public String getEmail() { 
        return email; 
    }

    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getImage() { 
        return image; 
    }

    public void setImage(String image) { 
        this.image = image; 
    }

    public String getRole() { 
        return role; 
    }

    public void setRole(String role) { 
        this.role = role; 
    }

    public LocalDate getCreatedAt() { 
        return createdAt; 
    }

    public void setCreatedAt(LocalDate createdAt) { 
        this.createdAt = createdAt; 
    }

    public String getPhone() { 
        return phone; 
    }

    public void setPhone(String phone) { 
        this.phone = phone; 
    }

    public String getLocation() { 
        return location; 
    }

    public void setLocation(String location) { 
        this.location = location; 
    }

    public String getGoogleId() { 
        return googleId; 
    }
    public void setGoogleId(String googleId) { 
        this.googleId = googleId; 
    }
}
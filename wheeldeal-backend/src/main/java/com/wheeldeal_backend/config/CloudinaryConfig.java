package com.wheeldeal_backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "diljgdzmr",
                "api_key", "646238434579732",
                "api_secret", "XftwFhbtus9mru2HXulc3OjXELw",
                "secure", true
        ));
    }
}

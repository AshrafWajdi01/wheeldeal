package com.wheeldeal_backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "myVerySecretKeyForJWTTokenGenerationThatIsLongEnough123456789"; 
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; 

    public static String generateToken(Long user_id, String email) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", user_id)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public static boolean validateToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static Long getUserId(String token) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return ((Integer) Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("userId")).longValue();
    }
}
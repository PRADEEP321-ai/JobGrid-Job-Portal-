package com.JobGrid.Contoller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JobGrid.Dtos.UserDto;
import com.JobGrid.Repository.UserRepository;   // adjust to your package
import com.JobGrid.Entity.User;                 // adjust to your package
import com.JobGrid.util.JWTUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

     private final JWTUtil jwtUtil;
     private final AuthenticationManager authenticationManager;
     private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword()));

            String email = auth.getName();   // the same value loadUserByUsername was given
            User user = userRepository.findByEmail(email).orElseThrow();

            String token = jwtUtil.generateToken(email);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Wrong email or password."));
        }
    }
}
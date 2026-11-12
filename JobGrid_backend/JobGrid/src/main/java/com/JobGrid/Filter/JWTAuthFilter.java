
package com.JobGrid.Filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.JobGrid.Service.CustomUserDetailsService;
import com.JobGrid.util.JWTUtil;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public JWTAuthFilter(
            JWTUtil jwtUtil,
            CustomUserDetailsService customUserDetailsService) {

        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Check whether Authorization header contains Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                // Extract username from JWT
                String username = jwtUtil.extractUsername(token);

                // Check whether authentication is already present
                if (username != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null) {

                    // Load user from database
                    UserDetails userDetails =
                            customUserDetailsService.loadUserByUsername(username);

                    // Validate JWT
                    if (jwtUtil.validateToken(token, userDetails)) {

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        // Set authentication in SecurityContext
                        SecurityContextHolder.getContext()
                                .setAuthentication(authentication);

                        System.out.println("JWT authentication successful for: " + username);
                        System.out.println("User authorities: " + userDetails.getAuthorities());
                    }
                }

            } catch (JwtException | IllegalArgumentException |
                     UsernameNotFoundException e) {

                System.out.println("JWT authentication failed: " + e.getMessage());
                System.out.println("Exception: " + e.getClass().getSimpleName());
                System.out.println("Message: " + e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}

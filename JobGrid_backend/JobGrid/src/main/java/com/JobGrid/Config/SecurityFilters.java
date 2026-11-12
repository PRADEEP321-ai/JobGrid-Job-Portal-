package com.JobGrid.Config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.JobGrid.Filter.JWTAuthFilter;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityFilters {

	// both are injected through the constructor (Lombok writes it)
	private final JWTAuthFilter jwtAuthFilter;
	private final UserDetailsService userDetailsService;

	// comes from application.properties, so Render can set the real Vercel URL
	@Value("${cors.allowed-origins:http://localhost:5173,http://localhost:3000}")
	private List<String> allowedOrigins;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

		httpSecurity
				// allow React app (different origin) to call this API
				.cors(Customizer.withDefaults())
				// stateless REST API, so CSRF is not needed
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth

						// ---------- PUBLIC (no login needed) ----------
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // browser preflight
						.requestMatchers("/error").permitAll() // so 401/403 messages are not hidden
						.requestMatchers("/api/users/create").permitAll() // sign up
						.requestMatchers("/api/auth/**").permitAll() // login
						// add more public pages here, e.g. browsing jobs:
						// .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()

						// ---------- ROLE BASED ----------
						.requestMatchers("/api/admin/**").hasRole("ADMIN")
						.requestMatchers("/api/candidate/**").hasRole("CANDIDATE")
						.requestMatchers("/api/company/**").hasRole("COMPANY")

						// Resume Analyzer: candidate only
						.requestMatchers("/api/resume/**").hasRole("CANDIDATE")

						// ---------- SHARED ----------
						.requestMatchers("/api/application/**").hasAnyRole("CANDIDATE", "COMPANY", "ADMIN")

						// ---------- EVERYTHING ELSE needs login ----------
						.anyRequest().authenticated());

		httpSecurity.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		httpSecurity.exceptionHandling(ex -> ex
				.authenticationEntryPoint((req, res, e) ->
						res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid token"))
				.accessDeniedHandler((req, res, e) ->
						res.sendError(HttpServletResponse.SC_FORBIDDEN, "Role not allowed")));

		return httpSecurity.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(allowedOrigins);
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return new ProviderManager(provider);
	}
}
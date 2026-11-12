package com.JobGrid.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.JobGrid.Entity.Role;
// TODO: change these imports to match your project
import com.JobGrid.Entity.User;
import com.JobGrid.Repository.UserRepository;

@Configuration
public class AdminDataInitializer {

	@Bean
	CommandLineRunner createDefaultAdmin(UserRepository userRepository,
			PasswordEncoder passwordEncoder,
			// values come from application.properties, with defaults so they are never null
			@Value("${admin.email}") String adminEmail,
			@Value("${admin.password}") String adminPassword) {

		return args -> {
			// create the admin only once
			if (userRepository.findByEmail(adminEmail).isPresent()) {
				return;
			}

			User admin = new User();
			admin.setName("Admin");
			admin.setEmail(adminEmail);
			admin.setPassword(passwordEncoder.encode(adminPassword)); // <-- this line was missing/null
			admin.setRole(Role.ADMIN); // use Role.ADMIN if your role field is an enum

			userRepository.save(admin);
		};
	}
}
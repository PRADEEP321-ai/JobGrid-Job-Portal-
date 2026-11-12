package com.JobGrid.Dtos;

import java.time.LocalDateTime;
import com.JobGrid.Entity.Role;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	
	private Long id;
	@NotBlank(message = "Name is requird")
	private String name;
	@NotBlank(message = "Email is required")
	private String email;
	@NotBlank(message = "password is Required")
	private String password;
	private String confirmPassword; // olny for sign up
	private Role role;
	private LocalDateTime createdAt;
}

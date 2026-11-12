package com.JobGrid.Service.Imp;

import java.util.EnumSet;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.JobGrid.Dtos.UserDto;
import com.JobGrid.Entity.Role;
import com.JobGrid.Entity.User;
import com.JobGrid.Exceptions.ResourceNotFoundException;
import com.JobGrid.Repository.UserRepository;
import com.JobGrid.Service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

	// roles allowed at sign up (never ADMIN)
	private static final Set<Role> SIGNUP_ROLES = EnumSet.of(Role.CANDIDATE, Role.COMPANY);

	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public UserDto createUser(UserDto userDto) {

		if (userDto.getName() == null || userDto.getName().isBlank()) {
			throw new IllegalArgumentException("Name is required");
		}
		if (userDto.getEmail() == null || userDto.getEmail().isBlank()) {
			throw new IllegalArgumentException("Email is required");
		}
		if (userDto.getPassword() == null || userDto.getPassword().isBlank()) {
			throw new IllegalArgumentException("Password is required");
		}
		if (userDto.getConfirmPassword() == null || userDto.getConfirmPassword().isBlank()) {
			throw new IllegalArgumentException("Confirm password is required");
		}
		if (!userDto.getPassword().equals(userDto.getConfirmPassword())) {
			throw new IllegalArgumentException("Password and confirm password do not match");
		}

		String email = userDto.getEmail().trim().toLowerCase();
		if (userRepository.existsByEmail(email)) {
			throw new IllegalArgumentException("User with given email already exists");
		}

		// only CANDIDATE or COMPANY may sign up (never ADMIN)
		Role role = userDto.getRole();
		if (role == null || !SIGNUP_ROLES.contains(role)) {
			throw new IllegalArgumentException("Role must be CANDIDATE or COMPANY");
		}

		User user = modelMapper.map(userDto, User.class);
		user.setEmail(email);
		user.setRole(role);
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));   // HASH IT
		
		User savedUser = userRepository.save(user);
		return toSafeDto(savedUser);
	}

	@Override
	@Transactional(readOnly = true)
	public UserDto getUserByEmail(String email) {
		User user = userRepository.findByEmail(email.trim().toLowerCase())
				.orElseThrow(() -> new ResourceNotFoundException("User email not found"));
		return toSafeDto(user);
	}

	@Override
	@Transactional(readOnly = true)
	public UserDto getUserById(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
		return toSafeDto(user);
	}

	@Override
	@Transactional
	public UserDto updateUser(UserDto userDto, Long userId) {
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));

		// email and role are not changed here
		if (userDto.getName() != null && !userDto.getName().isBlank()) {
			existingUser.setName(userDto.getName());
		}
		if (userDto.getPassword() != null && !userDto.getPassword().isBlank()) {
			existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));   // HASH IT
		}

		return toSafeDto(userRepository.save(existingUser));
	}

	@Override
	@Transactional(readOnly = true)
	public Iterable<UserDto> getAllUser() {
		return userRepository.findAll().stream().map(this::toSafeDto).toList();
	}

	@Override
	@Transactional
	public void deleteUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
		userRepository.delete(user);
	}

	// map to DTO and remove password fields so they are never sent to the frontend
	private UserDto toSafeDto(User user) {
		UserDto dto = modelMapper.map(user, UserDto.class);
		dto.setPassword(null);
		dto.setConfirmPassword(null);
		return dto;
	}
}
package com.JobGrid.Service;

import com.JobGrid.Dtos.UserDto;
import com.JobGrid.Entity.User;

public interface UserService {
	
	//create User
	UserDto createUser(UserDto user);
	
	// Get user By Email
	UserDto getUserByEmail(String email);
	
	//update User
	UserDto updateUser(UserDto userDto, Long userId);
	
	//delete user
	void deleteUser(Long userId);
	
	//get user by Id
	UserDto getUserById(Long userId);
	
	//get all user
	Iterable<UserDto> getAllUser();

}

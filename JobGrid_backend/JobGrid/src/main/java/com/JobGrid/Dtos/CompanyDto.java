package com.JobGrid.Dtos;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {

	private Long id;
	private Long userId;

	// read from User, shown in the response
	private String companyName;
	private String companyEmail;

	private String industry;
	private String location;
	private String website;
	private String companySize;

	@Min(value = 1800, message = "Enter a valid founded year")
	@Max(value = 2100, message = "Enter a valid founded year")
	private Integer foundedYear;

	@Min(value = 1000000000L, message = "Phone number must be 10 digits")
	@Max(value = 9999999999L, message = "Phone number must be 10 digits")
	private Long phoneNumber;

	private String aboutCompany;
	private String logoUrl;
	private Boolean verified;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
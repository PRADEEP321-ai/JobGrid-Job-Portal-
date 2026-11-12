package com.JobGrid.Dtos;

import java.util.LinkedHashSet;
import java.util.Set;

import com.JobGrid.Entity.ExperienceLevel;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CandidateDto {

	private Long id;

	@NotNull(message = "User id is required")
	private Long userId;

	// ---------- Personal Information ----------
	@NotBlank(message = "Enter first name")
	private String firstName;

	@NotBlank(message = "Enter last name")
	private String lastName;

	@NotNull(message = "Enter phone number")
	@Min(value = 1000000000L, message = "Phone number must be 10 digits")
	@Max(value = 9999999999L, message = "Phone number must be 10 digits")
	private Long phoneNo;

	@NotBlank(message = "Enter location")
	private String location;

	private ExperienceLevel experience;

	// ---------- Professional Headline ----------
	private String professionalHeadline;

	// ---------- About ----------
	@NotBlank(message = "Enter about you")
	private String aboutMe;

	// ---------- Education ----------
	@NotBlank(message = "Enter degree")
	private String degree;

	@NotBlank(message = "Enter college name")
	private String college;

	@NotNull(message = "Enter expected graduation year")
	private Integer expectedGraduation;

	// ---------- Skills ----------
	@NotEmpty(message = "Enter at least one skill")
	private Set<String> skills = new LinkedHashSet<>();

	// ---------- Social Profile ----------
	@NotBlank(message = "Enter LinkedIn URL")
	private String linkedUrl;

	@NotBlank(message = "Enter GitHub URL")
	private String gitHubUrl;

	@NotBlank(message = "Enter portfolio URL")
	private String portfolioUrl;
}
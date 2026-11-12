package com.JobGrid.Dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.JobGrid.Entity.Company;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobDto {

	private Long id;
    // Job Information
	
    @NotBlank(message = "Job title is required")
    @Size(max = 150)
    private String title;

    @NotBlank(message = "Job category is required")
    @Size(max = 100)
    private String category;

    @NotBlank(message = "Job type is required")
    @Size(max = 50)
    private String jobType;

    @FutureOrPresent(message = "Deadline cannot be in the past")
    private LocalDate deadline;

    @NotNull(message = "Minimum salary is required")
    @DecimalMin(value = "0.0", message = "Minimum salary cannot be negative")
    private BigDecimal salaryMin;

    @NotNull(message = "Maximum salary is required")
    @DecimalMin(value = "0.0", message = "Maximum salary cannot be negative")
    private BigDecimal salaryMax;

    @NotBlank(message = "Currency is required")
    private String currency;

    @NotBlank(message = "Salary period is required")
    private String salaryPeriod;

    @NotBlank(message = "Job description is required")
    @Size(max = 5000)
    private String description;

    // Company Information

    @NotBlank(message = "Company name is required")
    @Size(max = 150)
    private String companyName;

    @Size(max = 500)
    private String website;

    @Size(max = 100)
    private String industry;

    @Size(max = 500)
    private String facebook;

    @Size(max = 500)
    private String linkedin;

    @Size(max = 500)
    private String twitter;

    @Size(max = 500)
    private String instagram;

    @Size(max = 3000)
    private String companyDescription;

    // Recruiter Information

    @NotBlank(message = "Recruiter name is required")
    @Size(max = 150)
    private String recruiter;

    @NotBlank(message = "Recruiter email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 150)
    private String email;
}


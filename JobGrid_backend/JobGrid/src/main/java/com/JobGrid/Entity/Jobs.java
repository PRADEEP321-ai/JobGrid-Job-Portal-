package com.JobGrid.Entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Job Information
    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 50)
    private String jobType;

    private LocalDate deadline;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal salaryMin;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal salaryMax;

    @Column(nullable = false, length = 20)
    private String currency;

    @Column(nullable = false, length = 20)
    private String salaryPeriod;

    @Column(nullable = false, length = 5000)
    private String description;

    // Company Information
    @Column(nullable = false, length = 150)
    private String companyName;

    @Column(length = 500)
    private String website;

    @Column(length = 100)
    private String industry;

    @Column(length = 500)
    private String facebook;

    @Column(length = 500)
    private String linkedin;

    @Column(length = 500)
    private String twitter;

    @Column(length = 500)
    private String instagram;

    @Column(length = 3000)
    private String companyDescription;

    // Logo information
    private String logoUrl;

    private String logoFileName;

    // Recruiter Information
    @Column(nullable = false, length = 150)
    private String recruiter;

    @Column(nullable = false, length = 150)
    private String email;

    // Job creation date
    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @PrePersist
    public void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}

package com.JobGrid.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JobGrid.Entity.Company;

public interface CompanyRepo extends JpaRepository<Company, Long> {
	boolean existsByUserId(Long userId);
	Optional<Company> findByUserId(Long userId);
}

package com.JobGrid.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.JobGrid.Entity.Jobs;

@Repository
public interface JobRepository extends JpaRepository<Jobs, Long> {

    // Check duplicate job title for the same company
    boolean existsByTitleIgnoreCaseAndCompany_User_NameIgnoreCase(
            String title, String name);

    // Ignore current job ID while updating
    boolean existsByTitleIgnoreCaseAndCompany_User_NameIgnoreCaseAndIdNot(
            String title, String name, Long id);
}
package com.JobGrid.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JobGrid.Entity.Candidate;

public interface CandidateRepo extends JpaRepository<Candidate, Long>{

}

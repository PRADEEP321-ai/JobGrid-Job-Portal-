package com.JobGrid.Service;

import java.util.List;

import com.JobGrid.Dtos.CandidateDto;

public interface CandidateService {
	
	CandidateDto createProfile(CandidateDto candidateDto);
	
	List<CandidateDto> getAllCandidate();
	
	CandidateDto getCandidateById(Long id);
	
	CandidateDto updateCandidate(CandidateDto candidateDto, Long id);
	
	void deleteCandidate(Long id);
}
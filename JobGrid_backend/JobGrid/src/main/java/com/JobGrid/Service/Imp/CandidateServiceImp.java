package com.JobGrid.Service.Imp;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.JobGrid.Dtos.CandidateDto;
import com.JobGrid.Entity.Candidate;
import com.JobGrid.Entity.User;
import com.JobGrid.Exceptions.ResourceNotFoundException;
import com.JobGrid.Repository.CandidateRepo;
import com.JobGrid.Repository.UserRepository;
import com.JobGrid.Service.CandidateService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateServiceImp implements CandidateService {

	private final CandidateRepo candidateRepo;
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;

	@Override
	@Transactional
	public CandidateDto createProfile(CandidateDto candidateDto) {

		if (candidateDto.getUserId() == null) {
			throw new IllegalArgumentException("User id is required");
		}

		if (candidateDto.getFirstName() == null || candidateDto.getFirstName().isBlank()) {
			throw new IllegalArgumentException("First name is required");
		}

		if (candidateDto.getLastName() == null || candidateDto.getLastName().isBlank()) {
			throw new IllegalArgumentException("Last name is required");
		}

		if (candidateDto.getPhoneNo() == null) {
			throw new IllegalArgumentException("Phone number is required");
		}

		if (candidateDto.getLocation() == null || candidateDto.getLocation().isBlank()) {
			throw new IllegalArgumentException("Location is required");
		}

		User user = userRepository.findById(candidateDto.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));

		Candidate candidate = modelMapper.map(candidateDto, Candidate.class);
		candidate.setId(null);     // make sure a new row is created
		candidate.setUser(user);   // connect candidate to user

		Candidate savedCandidate = candidateRepo.save(candidate);
		return modelMapper.map(savedCandidate, CandidateDto.class);
	}

	@Override
	@Transactional(readOnly = true)
	public List<CandidateDto> getAllCandidate() {
		return candidateRepo
				.findAll()
				.stream()
				.map(candidate -> modelMapper.map(candidate, CandidateDto.class))
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public CandidateDto getCandidateById(Long id) {
		Candidate candidate = candidateRepo
				.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Candidate not found with given id"));

		return modelMapper.map(candidate, CandidateDto.class);
	}

	@Override
	@Transactional
	public CandidateDto updateCandidate(CandidateDto candidateDto, Long id) {
		Candidate existingCandidate = candidateRepo
				.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Candidate not found with given id"));

		// Personal Information
		if (candidateDto.getFirstName() != null && !candidateDto.getFirstName().isBlank())
			existingCandidate.setFirstName(candidateDto.getFirstName());

		if (candidateDto.getLastName() != null && !candidateDto.getLastName().isBlank())
			existingCandidate.setLastName(candidateDto.getLastName());

		if (candidateDto.getPhoneNo() != null)
			existingCandidate.setPhoneNo(candidateDto.getPhoneNo());

		if (candidateDto.getLocation() != null && !candidateDto.getLocation().isBlank())
			existingCandidate.setLocation(candidateDto.getLocation());

		if (candidateDto.getExperience() != null)
			existingCandidate.setExperience(candidateDto.getExperience());

		// Professional Headline
		if (candidateDto.getProfessionalHeadline() != null && !candidateDto.getProfessionalHeadline().isBlank())
			existingCandidate.setProfessionalHeadline(candidateDto.getProfessionalHeadline());

		// About me
		if (candidateDto.getAboutMe() != null && !candidateDto.getAboutMe().isBlank())
			existingCandidate.setAboutMe(candidateDto.getAboutMe());

		// Education
		if (candidateDto.getDegree() != null && !candidateDto.getDegree().isBlank())
			existingCandidate.setDegree(candidateDto.getDegree());

		if (candidateDto.getCollege() != null && !candidateDto.getCollege().isBlank())
			existingCandidate.setCollege(candidateDto.getCollege());

		if (candidateDto.getExpectedGraduation() != null)
			existingCandidate.setExpectedGraduation(candidateDto.getExpectedGraduation());

		// Skills
		if (candidateDto.getSkills() != null && !candidateDto.getSkills().isEmpty()) {
			existingCandidate.getSkills().clear();
			existingCandidate.getSkills().addAll(candidateDto.getSkills());
		}

		// Social Profile
		if (candidateDto.getLinkedUrl() != null && !candidateDto.getLinkedUrl().isBlank())
			existingCandidate.setLinkedUrl(candidateDto.getLinkedUrl());

		if (candidateDto.getGitHubUrl() != null && !candidateDto.getGitHubUrl().isBlank())
			existingCandidate.setGitHubUrl(candidateDto.getGitHubUrl());

		if (candidateDto.getPortfolioUrl() != null && !candidateDto.getPortfolioUrl().isBlank())
			existingCandidate.setPortfolioUrl(candidateDto.getPortfolioUrl());

		Candidate updatedCandidate = candidateRepo.save(existingCandidate);
		return modelMapper.map(updatedCandidate, CandidateDto.class);
	}

	@Override
	@Transactional
	public void deleteCandidate(Long id) {
		Candidate candidate = candidateRepo
				.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Candidate not found with given id"));

		candidateRepo.delete(candidate);
	}
}
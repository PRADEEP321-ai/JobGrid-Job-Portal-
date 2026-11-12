package com.JobGrid.Contoller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JobGrid.Dtos.CandidateDto;
import com.JobGrid.Service.CandidateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidate")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {

	private final CandidateService candidateService;

	public CandidateController(CandidateService candidateService) {
		this.candidateService = candidateService;
	}
	
	@PreAuthorize("hasRole('CANDIDATE')")
	@PostMapping("/create-candidate")
	public ResponseEntity<CandidateDto> createCandidate(@Valid @RequestBody CandidateDto candidateDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(candidateService.createProfile(candidateDto));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getCandidate")
	public ResponseEntity<List<CandidateDto>> getAllCandidate() {
		return ResponseEntity.ok(candidateService.getAllCandidate());
	}
	
	@PreAuthorize("hasRole('CANDIDATE', 'ADMIN','COMPANY')")
	@GetMapping("/{id}")
	public ResponseEntity<CandidateDto> getCandidateById(@PathVariable Long id) {
		return ResponseEntity.ok(candidateService.getCandidateById(id));
	}

	// No @Valid here, so partial updates are allowed
	@PreAuthorize("hasRole('CANDIDATE')")
	@PutMapping("/{id}")
	public ResponseEntity<CandidateDto> updateCandidate(@RequestBody CandidateDto candidateDto,
			@PathVariable Long id) {
		return ResponseEntity.ok(candidateService.updateCandidate(candidateDto, id));
	}

	@PreAuthorize("hasRole('CANDIDATE', 'ADMIN')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteCandidate(@PathVariable Long id) {
		candidateService.deleteCandidate(id);
		return ResponseEntity.ok("Candidate deleted successfully");
	}
}
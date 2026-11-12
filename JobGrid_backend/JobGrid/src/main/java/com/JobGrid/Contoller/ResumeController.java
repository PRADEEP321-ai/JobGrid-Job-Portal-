package com.JobGrid.Contoller;



import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.JobGrid.Dtos.ResumeAnalysisResponse;
import com.JobGrid.Service.ResumeAnalyzerService;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {
	
	private final ResumeAnalyzerService resumeAnalyzerService;

	public ResumeController(ResumeAnalyzerService resumeAnalyzerService) {
		this.resumeAnalyzerService = resumeAnalyzerService;
	}
	
	@PreAuthorize("hasRole('CANDIDATE')")
	@PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResumeAnalysisResponse> analyzeResume(@RequestParam("file") MultipartFile file){
		ResumeAnalysisResponse response = resumeAnalyzerService.analyzeResume(file);
		return ResponseEntity.ok(response);
	}
	
}
package com.JobGrid.Service;

import org.springframework.web.multipart.MultipartFile;

import com.JobGrid.Dtos.ResumeAnalysisResponse;

public interface ResumeAnalyzerService {
	
	ResumeAnalysisResponse analyzeResume(MultipartFile file);
}

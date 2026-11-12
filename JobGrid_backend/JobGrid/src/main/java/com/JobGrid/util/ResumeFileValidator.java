package com.JobGrid.util;

import java.io.IOException;
import java.util.Locale;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.JobGrid.Exceptions.ResumeAnalysisException;

@Component
public class ResumeFileValidator {
	
	public static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
	
	public void validate(MultipartFile file) {
		if(file == null || file.isEmpty()) {
			throw new ResumeAnalysisException("Please upload a resume");
		}
		
		if(file.getSize() > MAX_FILE_SIZE) {
			throw new ResumeAnalysisException(
					"File size must not exceed 10 MB.");
		}
		
		String fileName = file.getOriginalFilename();
		
		if(fileName == null) {
			throw new ResumeAnalysisException("Invalid file name.");
		}
		
		String lowerName = fileName.toLowerCase(Locale.ROOT);
		
		boolean isPdf = lowerName.endsWith(".pdf");
		boolean isDocx = lowerName.endsWith(".docx");
		
		if(!isPdf && !isDocx) {
			throw new ResumeAnalysisException(
					"Only PDF and DOCX files are allowed.");
		}
		
		try {
			byte[] bytes = file.getBytes();
			
			if(isPdf) {
				boolean validPdf = 
						bytes.length >= 5 && 
						bytes[0] == '%' &&
						bytes[1] == 'P' &&
						bytes[2] == 'D' &&
						bytes[3] == 'F' &&
						bytes[4] == '-';
						
				if(!validPdf) {
					throw new ResumeAnalysisException("Invalid PDF file");
				}
			}
			
			if(isDocx) {
				boolean validDocx = 
						bytes.length >= 4 &&
						bytes[0] == 'P' &&
						bytes[1] == 'K' &&
						bytes[2] == 3 &&
						bytes[3] == 4;
						
				if(!validDocx) {
					throw new ResumeAnalysisException(
							"Invalid DOCX file.");
				}
			}
		} catch (IOException e) {
			throw new ResumeAnalysisException(
					"Unable to read uploaded file");
		}
	}
}

package com.JobGrid.Service;

import java.util.List;

import com.JobGrid.Dtos.JobDto;

public interface JobService {
	
	JobDto createJobs(JobDto jobsDto);
	
	List<JobDto> getAllJobs();
	
	JobDto getJobById(Long id);
	
	JobDto updateJobs(JobDto jobsDto, Long id);
	
	void deleteJobs(Long id);

}

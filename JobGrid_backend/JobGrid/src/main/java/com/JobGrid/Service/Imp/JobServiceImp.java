
package com.JobGrid.Service.Imp;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.JobGrid.Dtos.JobDto;
import com.JobGrid.Entity.Jobs;
import com.JobGrid.Exceptions.DuplicateResourceException;
import com.JobGrid.Exceptions.ResourceNotFoundException;
import com.JobGrid.Repository.JobRepository;
import com.JobGrid.Service.JobService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobServiceImp implements JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;
    
    @Override
    @Transactional
    public JobDto createJobs(JobDto jobDto) {

        // 1. validations first
        if (jobDto.getTitle() == null || jobDto.getTitle().isBlank()) {
            throw new IllegalArgumentException("Job title is required");
        }

        if (jobDto.getCompanyName() == null || jobDto.getCompanyName().isBlank()) {
            throw new IllegalArgumentException("Company name is required");
        }

        if (jobDto.getSalaryMin() == null || jobDto.getSalaryMax() == null) {
            throw new IllegalArgumentException("Minimum and maximum salary are required");
        }

        if (jobDto.getSalaryMin().signum() < 0 || jobDto.getSalaryMax().signum() < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }

        if (jobDto.getSalaryMax().compareTo(jobDto.getSalaryMin()) < 0) {
            throw new IllegalArgumentException(
                    "Maximum salary must be greater than or equal to minimum salary");
        }

        // 2. now it is safe to trim, because title and company are not null
        String title = jobDto.getTitle().trim();
        String company = jobDto.getCompanyName().trim();

        // 3. duplicate check
        if (jobRepository.existsByTitleIgnoreCaseAndCompany_User_NameIgnoreCase(title, company)) {
            throw new DuplicateResourceException(
                    "Job '" + title + "' already exists for " + company);
        }

        jobDto.setTitle(title);
        jobDto.setCompanyName(company);

        // 4. save
        Jobs job = modelMapper.map(jobDto, Jobs.class);
        job.setId(null);

        Jobs savedJob = jobRepository.save(job);

        return modelMapper.map(savedJob, JobDto.class);
    }
	
	@Override
	@Transactional(readOnly = true)
	public List<JobDto> getAllJobs() {
		return jobRepository
				.findAll()
				.stream()
				.map(job -> modelMapper.map(job, JobDto.class))
				.toList();
	}
	
	@Override
	@Transactional(readOnly = true)
	public JobDto getJobById(Long id) {
		Jobs job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found with given id"));

        return modelMapper.map(job, JobDto.class);
	}
	
	
	@Override
	@Transactional
	public JobDto updateJobs(JobDto jobDto, Long id) {

	    // 1. find the job which we want to update
	    Jobs existingJob = jobRepository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Job not found with given id"));

	    // 2. salary check
	    //    if user sends only min or only max, we compare with the old saved value
	    var newMin = jobDto.getSalaryMin() != null ? jobDto.getSalaryMin() : existingJob.getSalaryMin();
	    var newMax = jobDto.getSalaryMax() != null ? jobDto.getSalaryMax() : existingJob.getSalaryMax();

	    if (newMin != null && newMax != null) {
	        if (newMin.signum() < 0 || newMax.signum() < 0) {
	            throw new IllegalArgumentException("Salary cannot be negative");
	        }

	        if (newMax.compareTo(newMin) < 0) {
	            throw new IllegalArgumentException(
	                    "Maximum salary must be greater than or equal to minimum salary");
	        }
	    }

	    // 3. duplicate check (use trimmed values, if not sent keep the old value)
	    String newTitle = (jobDto.getTitle() != null && !jobDto.getTitle().isBlank())
	            ? jobDto.getTitle().trim() : existingJob.getTitle();

	    String newCompany = (jobDto.getCompanyName() != null && !jobDto.getCompanyName().isBlank())
	            ? jobDto.getCompanyName().trim() : existingJob.getCompanyName();

	    if (jobRepository.existsByTitleIgnoreCaseAndCompany_User_NameIgnoreCaseAndIdNot(newTitle, newCompany, id)) {
	        throw new DuplicateResourceException(
	                "Job '" + newTitle + "' already exists for " + newCompany);
	    }

	    // 4. update the fields
	    // Job Information
	    existingJob.setTitle(newTitle);       // trimmed value
	    existingJob. setCompanyName(newCompany);   // trimmed value

	    if (jobDto.getCategory() != null && !jobDto.getCategory().isBlank())
	        existingJob.setCategory(jobDto.getCategory());

	    if (jobDto.getJobType() != null && !jobDto.getJobType().isBlank())
	        existingJob.setJobType(jobDto.getJobType());

	    if (jobDto.getDeadline() != null)
	        existingJob.setDeadline(jobDto.getDeadline());

	    if (jobDto.getSalaryMin() != null)
	        existingJob.setSalaryMin(jobDto.getSalaryMin());

	    if (jobDto.getSalaryMax() != null)
	        existingJob.setSalaryMax(jobDto.getSalaryMax());

	    if (jobDto.getCurrency() != null && !jobDto.getCurrency().isBlank())
	        existingJob.setCurrency(jobDto.getCurrency());

	    if (jobDto.getSalaryPeriod() != null && !jobDto.getSalaryPeriod().isBlank())
	        existingJob.setSalaryPeriod(jobDto.getSalaryPeriod());

	    if (jobDto.getDescription() != null && !jobDto.getDescription().isBlank())
	        existingJob.setDescription(jobDto.getDescription());

	    // Company Information
	    if (jobDto.getWebsite() != null)
	        existingJob.setWebsite(jobDto.getWebsite());

	    if (jobDto.getIndustry() != null)
	        existingJob.setIndustry(jobDto.getIndustry());

	    if (jobDto.getFacebook() != null)
	        existingJob.setFacebook(jobDto.getFacebook());

	    if (jobDto.getLinkedin() != null)
	        existingJob.setLinkedin(jobDto.getLinkedin());

	    if (jobDto.getTwitter() != null)
	        existingJob.setTwitter(jobDto.getTwitter());

	    if (jobDto.getInstagram() != null)
	        existingJob.setInstagram(jobDto.getInstagram());

	    if (jobDto.getCompanyDescription() != null)
	        existingJob.setCompanyDescription(jobDto.getCompanyDescription());

	    // Recruiter Information
	    if (jobDto.getRecruiter() != null && !jobDto.getRecruiter().isBlank())
	        existingJob.setRecruiter(jobDto.getRecruiter());

	    if (jobDto.getEmail() != null && !jobDto.getEmail().isBlank())
	        existingJob.setEmail(jobDto.getEmail());

	    // 5. save and return
	    Jobs updatedJob = jobRepository.save(existingJob);

	    return modelMapper.map(updatedJob, JobDto.class);
	}
	
	@Override
	@Transactional
	public void deleteJobs(Long id) {
        Jobs job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found with given id"));

        jobRepository.delete(job);
		
	}


}

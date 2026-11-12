
package com.JobGrid.Contoller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.JobGrid.Dtos.JobDto;
import com.JobGrid.Service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Create Job
    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    @PostMapping("/create-job")
    public ResponseEntity<JobDto> createJob(
            @Valid @RequestBody JobDto jobDto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobService.createJobs(jobDto));
    }

    // Get All Jobs
    @PreAuthorize("hasAnyRole('CANDIDATE', 'COMPANY', 'ADMIN')")
    @GetMapping("/getJobs")
    public ResponseEntity<List<JobDto>> getAllJobs() {

        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get Job By ID
    @PreAuthorize("hasAnyRole('CANDIDATE', 'COMPANY', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // Update Job
    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<JobDto> updateJob(
            @PathVariable Long id,
            @RequestBody JobDto jobDto) {

        return ResponseEntity.ok(
                jobService.updateJobs(jobDto, id)
        );
    }

    // Delete Job
    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJobs(id);

        return ResponseEntity.ok("Job deleted successfully");
    }
}

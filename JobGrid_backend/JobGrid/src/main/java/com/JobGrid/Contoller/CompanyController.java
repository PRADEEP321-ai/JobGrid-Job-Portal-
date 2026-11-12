package com.JobGrid.Contoller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.JobGrid.Dtos.CompanyDto;
import com.JobGrid.Service.CompanyService;

@RestController
@RequestMapping("/api/company")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

	private final CompanyService companyService;

	public CompanyController(CompanyService companyService) {
		this.companyService = companyService;
	}

	// Get all companies
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getCompany")
	public ResponseEntity<List<CompanyDto>> getAllCompany() {
		return ResponseEntity.ok(companyService.getAllCompany());
	}

	// Get company by id
	@PreAuthorize("hasRole('ADMIN', 'COMPANY')")
	@GetMapping("/{id}")
	public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Long id) {
		return ResponseEntity.ok(companyService.getCompanyById(id));
	}

	// Get company by logged-in user id
	@PreAuthorize("hasRole('ADMIN', 'COMPANY')")
	@GetMapping("/user/{userId}")
	public ResponseEntity<CompanyDto> getCompanyByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(companyService.getCompanyByUserId(userId));
	}

	// Update company details (no @Valid, so partial updates are allowed)
	@PreAuthorize("hasRole('ADMIN', 'COMPANY')")
	@PutMapping("/{id}")
	public ResponseEntity<CompanyDto> updateCompany(@RequestBody CompanyDto companyDto,
			@PathVariable Long id) {
		return ResponseEntity.ok(companyService.updateCompany(companyDto, id));
	}

	// Upload logo (form-data, key = file)
	@PreAuthorize("hasRole('ADMIN', 'COMPANY')")
	@PostMapping("/{id}/logo")
	public ResponseEntity<CompanyDto> uploadLogo(@PathVariable Long id,
			@RequestParam("file") MultipartFile file) {
		return ResponseEntity.ok(companyService.uploadLogo(id, file));
	}

	// Delete company
	@PreAuthorize("hasRole('ADMIN', 'COMPANY')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteCompany(@PathVariable Long id) {
		companyService.deleteCompany(id);
		return ResponseEntity.ok("Company deleted successfully");
	}
}

package com.JobGrid.Service.Imp;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.JobGrid.Dtos.CompanyDto;
import com.JobGrid.Entity.Company;
import com.JobGrid.Entity.User;
import com.JobGrid.Exceptions.ResourceNotFoundException;
import com.JobGrid.Repository.CompanyRepo;
import com.JobGrid.Repository.UserRepository;
import com.JobGrid.Service.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImp implements CompanyService {

    private final CompanyRepo companyRepo;
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;

    @Value("${file.upload-dir:uploads/logos}")
    private String uploadDir;

    // Create a company profile for an existing user
    @Transactional
    public CompanyDto createCompanyProfile(
            CompanyDto companyDto, Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId));

        if (companyRepo.findByUserId(userId).isPresent()) {
            throw new IllegalArgumentException(
                    "Company profile already exists for this user");
        }

        Company company = new Company();
        company.setUser(user);
        company.setIndustry(companyDto.getIndustry());
        company.setLocation(companyDto.getLocation());
        company.setWebsite(companyDto.getWebsite());
        company.setCompanySize(companyDto.getCompanySize());
        company.setFoundedYear(companyDto.getFoundedYear());
        company.setPhoneNumber(companyDto.getPhoneNumber());
        company.setAboutCompany(companyDto.getAboutCompany());

        Company savedCompany = companyRepo.save(company);

        return toDto(savedCompany);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CompanyDto> getAllCompany() {
        return companyRepo.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyDto getCompanyById(Long id) {
        Company company = companyRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id: " + id));

        return toDto(company);
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyDto getCompanyByUserId(Long userId) {
        Company company = companyRepo.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found for user id: " + userId));

        return toDto(company);
    }

    @Override
    @Transactional
    public CompanyDto updateCompany(CompanyDto companyDto, Long id) {
        Company company = companyRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id: " + id));

        // Company name is stored in the associated User.
        if (companyDto.getCompanyName() != null
                && !companyDto.getCompanyName().isBlank()) {
            company.getUser().setName(companyDto.getCompanyName());
        }

        // Login email is not changed through this method.

        if (companyDto.getIndustry() != null
                && !companyDto.getIndustry().isBlank()) {
            company.setIndustry(companyDto.getIndustry());
        }

        if (companyDto.getLocation() != null
                && !companyDto.getLocation().isBlank()) {
            company.setLocation(companyDto.getLocation());
        }

        if (companyDto.getWebsite() != null
                && !companyDto.getWebsite().isBlank()) {
            company.setWebsite(companyDto.getWebsite());
        }

        if (companyDto.getCompanySize() != null
                && !companyDto.getCompanySize().isBlank()) {
            company.setCompanySize(companyDto.getCompanySize());
        }

        if (companyDto.getFoundedYear() != null) {
            company.setFoundedYear(companyDto.getFoundedYear());
        }

        if (companyDto.getPhoneNumber() != null) {
            company.setPhoneNumber(companyDto.getPhoneNumber());
        }

        if (companyDto.getAboutCompany() != null) {
            company.setAboutCompany(companyDto.getAboutCompany());
        }

        return toDto(companyRepo.save(company));
    }

    @Override
    @Transactional
    public CompanyDto uploadLogo(Long id, MultipartFile file) {
        Company company = companyRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id: " + id));

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a file");
        }

        String contentType = file.getContentType();

        if (contentType == null
                || !List.of("image/png", "image/jpeg", "image/webp")
                        .contains(contentType)) {
            throw new IllegalArgumentException(
                    "Only PNG, JPG or WEBP images are allowed");
        }

        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException(
                    "Logo must be smaller than 2MB");
        }

        String extension = switch (contentType) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            default -> ".jpg";
        };

        try {
            Path folder = Paths.get(uploadDir).toAbsolutePath();
            Files.createDirectories(folder);

            if (company.getLogoUrl() != null) {
                String oldName = Paths.get(company.getLogoUrl())
                        .getFileName().toString();

                Files.deleteIfExists(folder.resolve(oldName));
            }

            String fileName = UUID.randomUUID() + extension;

            Files.copy(
                    file.getInputStream(),
                    folder.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);

            company.setLogoUrl("/uploads/logos/" + fileName);

        } catch (IOException e) {
            throw new RuntimeException("Could not save logo", e);
        }

        return toDto(companyRepo.save(company));
    }

    @Override
    @Transactional
    public void deleteCompany(Long id) {
        Company company = companyRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Company not found with id: " + id));

        companyRepo.delete(company);
    }

    // Convert Company entity to your CompanyDto
    private CompanyDto toDto(Company company) {
        CompanyDto dto = modelMapper.map(company, CompanyDto.class);

        dto.setUserId(company.getUser().getId());
        dto.setCompanyName(company.getUser().getName());
        dto.setCompanyEmail(company.getUser().getEmail());

        return dto;
    }
}


package com.JobGrid.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.JobGrid.Dtos.CompanyDto;

public interface CompanyService {

    CompanyDto createCompanyProfile(CompanyDto companyDto, Long userId);

    List<CompanyDto> getAllCompany();

    CompanyDto getCompanyById(Long id);

    CompanyDto getCompanyByUserId(Long userId);

    CompanyDto updateCompany(CompanyDto companyDto, Long id);

    CompanyDto uploadLogo(Long id, MultipartFile file);

    void deleteCompany(Long id);
}

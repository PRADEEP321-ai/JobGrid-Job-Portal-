package com.JobGrid.Config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.JobGrid.Dtos.JobDto;
import com.JobGrid.Entity.Jobs;

@Configuration
public class ProjectConfig {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper() ;
	}
}
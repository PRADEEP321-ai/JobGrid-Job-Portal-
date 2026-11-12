package com.JobGrid.Entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "candidate")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Candidate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Connect candidate with login user
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;

	//---------- Personal Information ----------
	private String firstName;
	private String lastName;
	private Long phoneNo;
	private String location;

	@Enumerated(EnumType.STRING)
	private ExperienceLevel experience;

	//---------- Professional Headline ----------
	private String professionalHeadline;

	//---------- About me ----------
	@Column(length = 2000)
	private String aboutMe;

	//---------- Education -----------
	private String degree;
	private String college;
	private Integer expectedGraduation;

	//---------- Skills ----------
	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(
			name = "candidate_skills",
			joinColumns = @JoinColumn(name = "candidate_id")
	)
	@Column(name = "skills", length = 50)
	@Builder.Default
	private Set<String> skills = new LinkedHashSet<>();

	//---------- Social Profile ----------
	private String linkedUrl;
	private String gitHubUrl;
	private String portfolioUrl;
}
package com.JobGrid.Entity;

public enum ExperienceLevel {
	
	FRESHER("Fresher"),
	ONE_TO_THREE("1-3 years"),
	THREE_TO_FIVE("3-5 years"),
	FIVE_PLUS("5+ years");
	
	private final String label;
	
	private ExperienceLevel(String label) {
		this.label = label;
	}
	
	public String getLabel() {
		return label;
	}
	
}

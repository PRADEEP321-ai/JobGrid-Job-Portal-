package com.JobGrid.Dtos;

import java.util.List;

public record ResumeAnalysisResponse(
		Integer atsScore,
		String summary,
		Integer issueCount,
		List<ResumeComponentDto> components,
		List<ResumeSuggestionDto> suggestions
		) {

}

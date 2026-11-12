package com.JobGrid.Exceptions;


import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.JobGrid.Dtos.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
	
	// resource not found exception
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception){
		ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), HttpStatus.NOT_FOUND);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException exception){
		ErrorResponse errorResponse = new ErrorResponse(exception.getMessage(), HttpStatus.BAD_REQUEST);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex){
		String message = ex.getBindingResult().getFieldErrors().stream()
				.map(e -> e.getField() + " : " + e.getDefaultMessage())
				.collect(Collectors.joining(", "));
		
		return ResponseEntity.badRequest().body(new ErrorResponse(message, HttpStatus.BAD_REQUEST));
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
		log.error("Unexpected application error: {}", ex.getMessage());
		
	    ErrorResponse errorResponse = new ErrorResponse("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	}
	
	@ExceptionHandler(DuplicateResourceException.class)
	public ResponseEntity<Map<String, String>> handleDuplicate(DuplicateResourceException ex) {
	    Map<String, String> body = new HashMap<>();
	    body.put("message", ex.getMessage());
	    body.put("status", "409 CONFLICT");
	    return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
	}
	
	@ExceptionHandler(ResumeAnalysisException.class)
	public ResponseEntity<ErrorResponse> handleResumeException(
	        ResumeAnalysisException ex) {

	    ErrorResponse errorResponse = new ErrorResponse(
	            ex.getMessage(),
	            HttpStatus.BAD_REQUEST
	    );

	    return ResponseEntity
	            .badRequest()
	            .body(errorResponse);
	}
	
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<ErrorResponse> handleFileSizeException(
	        MaxUploadSizeExceededException ex) {

	    ErrorResponse errorResponse = new ErrorResponse(
	            "File size must not exceed 5 MB.",
	            HttpStatus.CONTENT_TOO_LARGE
	    );

	    return ResponseEntity
	            .status(HttpStatus.CONTENT_TOO_LARGE)
	            .body(errorResponse);
	}

}

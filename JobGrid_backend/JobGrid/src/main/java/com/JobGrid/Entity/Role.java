package com.JobGrid.Entity;


import java.util.Set;

public enum Role {
	
	CANDIDATE(Set.of(Permission.READ_JOBS)),
	COMPANY(Set.of(Permission.UPDTAE_JOBS, Permission.ADD_JOBS, Permission.DELETE_JOBS, Permission.READ_JOBS)),
	ADMIN(Set.of(Permission.UPDTAE_JOBS, Permission.ADD_JOBS, Permission.DELETE_JOBS, Permission.READ_JOBS));
	
	Set<Permission> permissions;

	private Role(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}
	
	
}

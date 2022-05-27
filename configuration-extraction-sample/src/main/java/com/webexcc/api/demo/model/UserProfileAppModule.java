
package com.webexcc.api.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class UserProfileAppModule {

	private String appModuleId;
	private String id;
	private String moduleAccessType;
	private List<UserProfileAppFeature> userProfileAppFeature = null;

	public String getAppModuleId() {
		return appModuleId;
	}

	public void setAppModuleId(String appModuleId) {
		this.appModuleId = appModuleId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getModuleAccessType() {
		return moduleAccessType;
	}

	public void setModuleAccessType(String moduleAccessType) {
		this.moduleAccessType = moduleAccessType;
	}

	public List<UserProfileAppFeature> getUserProfileAppFeature() {
		return userProfileAppFeature;
	}

	public void setUserProfileAppFeature(List<UserProfileAppFeature> userProfileAppFeature) {
		this.userProfileAppFeature = userProfileAppFeature;
	}

}

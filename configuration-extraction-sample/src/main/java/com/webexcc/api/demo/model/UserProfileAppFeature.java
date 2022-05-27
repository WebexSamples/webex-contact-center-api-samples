
package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class UserProfileAppFeature {

	private String appFeatureId;
	private String appFeatureName;
	private String featureAccessType;
	private String id;

	public String getAppFeatureId() {
		return appFeatureId;
	}

	public void setAppFeatureId(String appFeatureId) {
		this.appFeatureId = appFeatureId;
	}

	public String getAppFeatureName() {
		return appFeatureName;
	}

	public void setAppFeatureName(String appFeatureName) {
		this.appFeatureName = appFeatureName;
	}

	public String getFeatureAccessType() {
		return featureAccessType;
	}

	public void setFeatureAccessType(String featureAccessType) {
		this.featureAccessType = featureAccessType;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}

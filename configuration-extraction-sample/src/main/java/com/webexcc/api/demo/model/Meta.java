
package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class Meta {

	private String orgId;
	private Integer urlExpiration;

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public Integer getUrlExpiration() {
		return urlExpiration;
	}

	public void setUrlExpiration(Integer urlExpiration) {
		this.urlExpiration = urlExpiration;
	}

}

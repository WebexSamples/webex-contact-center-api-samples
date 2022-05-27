
package com.webexcc.api.demo.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuxiliaryCode implements Serializable {

	private Boolean active;
	private Long createdTime;
	private Boolean defaultCode;
	private String description;
	private String id;
	private Boolean isSystemCode;
	private Long lastUpdatedTime;
	private String name;
	private String workTypeCode;
	private String workTypeId;
	private final static long serialVersionUID = 8615808356482867620L;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public Boolean getDefaultCode() {
		return defaultCode;
	}

	public void setDefaultCode(Boolean defaultCode) {
		this.defaultCode = defaultCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getIsSystemCode() {
		return isSystemCode;
	}

	public void setIsSystemCode(Boolean isSystemCode) {
		this.isSystemCode = isSystemCode;
	}

	public Long getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(Long lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getWorkTypeCode() {
		return workTypeCode;
	}

	public void setWorkTypeCode(String workTypeCode) {
		this.workTypeCode = workTypeCode;
	}

	public String getWorkTypeId() {
		return workTypeId;
	}

	public void setWorkTypeId(String workTypeId) {
		this.workTypeId = workTypeId;
	}

}

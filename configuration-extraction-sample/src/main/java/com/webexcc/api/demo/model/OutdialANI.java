
package com.webexcc.api.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class OutdialANI {

	private Long createdTime;
	private String description;
	private String id;
	private Long lastUpdatedTime;
	private String name;
	private List<OutdialANIEntry> outdialANIEntries = null;

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
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

	public List<OutdialANIEntry> getOutdialANIEntries() {
		return outdialANIEntries;
	}

	public void setOutdialANIEntries(List<OutdialANIEntry> outdialANIEntries) {
		this.outdialANIEntries = outdialANIEntries;
	}

}

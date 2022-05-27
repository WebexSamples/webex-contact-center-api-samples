
package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DialNumber {

	private Long createdTime;
	private String dialledNumber;
	private String entryPointId;
	private String id;
	private Long lastUpdatedTime;
	private String routePointId;

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public String getDialledNumber() {
		return dialledNumber;
	}

	public void setDialledNumber(String dialledNumber) {
		this.dialledNumber = dialledNumber;
	}

	public String getEntryPointId() {
		return entryPointId;
	}

	public void setEntryPointId(String entryPointId) {
		this.entryPointId = entryPointId;
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

	public String getRoutePointId() {
		return routePointId;
	}

	public void setRoutePointId(String routePointId) {
		this.routePointId = routePointId;
	}

}

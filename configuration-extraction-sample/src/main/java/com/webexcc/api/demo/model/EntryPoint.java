
package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class EntryPoint {

	private Boolean active;
	private String channelType;
	private Long createdTime;
	private String description;
	private String entryPointType;
	private String id;
	private Long lastUpdatedTime;
	private Integer maximumActiveContacts;
	private String name;
	private String routePointId;
	private Integer serviceLevelThreshold;
	private String subscriptionId;
	private String timezone;
	private String xspVersion;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getChannelType() {
		return channelType;
	}

	public void setChannelType(String channelType) {
		this.channelType = channelType;
	}

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

	public String getEntryPointType() {
		return entryPointType;
	}

	public void setEntryPointType(String entryPointType) {
		this.entryPointType = entryPointType;
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

	public Integer getMaximumActiveContacts() {
		return maximumActiveContacts;
	}

	public void setMaximumActiveContacts(Integer maximumActiveContacts) {
		this.maximumActiveContacts = maximumActiveContacts;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRoutePointId() {
		return routePointId;
	}

	public void setRoutePointId(String routePointId) {
		this.routePointId = routePointId;
	}

	public Integer getServiceLevelThreshold() {
		return serviceLevelThreshold;
	}

	public void setServiceLevelThreshold(Integer serviceLevelThreshold) {
		this.serviceLevelThreshold = serviceLevelThreshold;
	}

	public String getSubscriptionId() {
		return subscriptionId;
	}

	public void setSubscriptionId(String subscriptionId) {
		this.subscriptionId = subscriptionId;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public String getXspVersion() {
		return xspVersion;
	}

	public void setXspVersion(String xspVersion) {
		this.xspVersion = xspVersion;
	}

}

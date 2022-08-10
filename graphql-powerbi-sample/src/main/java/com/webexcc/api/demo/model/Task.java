
package com.webexcc.api.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

 @JsonIgnoreProperties(ignoreUnknown = true)
public class Task implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1550422895799405948L;
	private String channelType;
	private Long createdTime;
	private String destination;
	private String direction;
	private Long endedTime;
	private String id;
	private Boolean isActive;
	private LastEntryPoint lastEntryPoint;
	private LastQueue lastQueue;
	private LastTeam lastTeam;
	private String origin;
	private Owner owner;
	private Integer selfserviceDuration;
	private String status;
	private String terminationType;
	private Integer totalDuration;
	private Integer connectedDuration;
	private String lastWrapupCodeName;
	private Integer queueDuration;
	private Integer ringingDuration;
	private Integer wrapupDuration;
	private String holdDuration;
	private LastSite lastSite;
	private Integer selfserviceCount;
	private Boolean captureRequested;
	private Integer queueCount;
	private CallbackData callbackData;
	private Customer customer;
	private Integer connectedCount;
	
	
	private List<Aggregation> aggregation = new ArrayList<>();

	public List<Aggregation> getAggregation() {
		return aggregation;
	}

	public String getChannelType() {
		return channelType;
	}

	public Integer getConnectedDuration() {
		return connectedDuration;
	}

	public Long getCreatedTime() {
		return createdTime;
	}

	public String getDestination() {
		return destination;
	}

	public String getDirection() {
		return direction;
	}

	public Long getEndedTime() {
		return endedTime;
	}

	public String getHoldDuration() {
		return holdDuration;
	}

	public String getId() {
		return id;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public LastEntryPoint getLastEntryPoint() {
		return lastEntryPoint;
	}

	public LastQueue getLastQueue() {
		return lastQueue;
	}

	public LastTeam getLastTeam() {
		return lastTeam;
	}

	public String getLastWrapupCodeName() {
		return lastWrapupCodeName;
	}

	public String getOrigin() {
		return origin;
	}

	public Owner getOwner() {
		return owner;
	}

	public Integer getQueueDuration() {
		return queueDuration;
	}

	public Integer getRingingDuration() {
		return ringingDuration;
	}

	public Integer getSelfserviceDuration() {
		return selfserviceDuration;
	}

	public String getStatus() {
		return status;
	}

	public String getTerminationType() {
		return terminationType;
	}

	public Integer getTotalDuration() {
		return totalDuration;
	}

	public Integer getWrapupDuration() {
		return wrapupDuration;
	}

	public void setAggregation(List<Aggregation> aggregation) {
		this.aggregation = aggregation;
	}

	public void setChannelType(String channelType) {
		this.channelType = channelType;
	}

	public void setConnectedDuration(Integer connectedDuration) {
		this.connectedDuration = connectedDuration;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public void setEndedTime(Long endedTime) {
		this.endedTime = endedTime;
	}

	public void setHoldDuration(String holdDuration) {
		this.holdDuration = holdDuration;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public void setLastEntryPoint(LastEntryPoint lastEntryPoint) {
		this.lastEntryPoint = lastEntryPoint;
	}

	public void setLastQueue(LastQueue lastQueue) {
		this.lastQueue = lastQueue;
	}

	public void setLastTeam(LastTeam lastTeam) {
		this.lastTeam = lastTeam;
	}

	public void setLastWrapupCodeName(String lastWrapupCodeName) {
		this.lastWrapupCodeName = lastWrapupCodeName;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	public void setQueueDuration(Integer queueDuration) {
		this.queueDuration = queueDuration;
	}

	public void setRingingDuration(Integer ringingDuration) {
		this.ringingDuration = ringingDuration;
	}

	public void setSelfserviceDuration(Integer selfserviceDuration) {
		this.selfserviceDuration = selfserviceDuration;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setTerminationType(String terminationType) {
		this.terminationType = terminationType;
	}

	public void setTotalDuration(Integer totalDuration) {
		this.totalDuration = totalDuration;
	}

	public void setWrapupDuration(Integer wrapupDuration) {
		this.wrapupDuration = wrapupDuration;
	}

	public LastSite getLastSite() {
		return lastSite;
	}

	public void setLastSite(LastSite lastSite) {
		this.lastSite = lastSite;
	}

	public Integer getSelfserviceCount() {
		return selfserviceCount;
	}

	public void setSelfserviceCount(Integer selfserviceCount) {
		this.selfserviceCount = selfserviceCount;
	}

	public Boolean getCaptureRequested() {
		return captureRequested;
	}

	public void setCaptureRequested(Boolean captureRequested) {
		this.captureRequested = captureRequested;
	}

	public Integer getQueueCount() {
		return queueCount;
	}

	public void setQueueCount(Integer queueCount) {
		this.queueCount = queueCount;
	}

	public CallbackData getCallbackData() {
		return callbackData;
	}

	public void setCallbackData(CallbackData callbackData) {
		this.callbackData = callbackData;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Integer getConnectedCount() {
		return connectedCount;
	}

	public void setConnectedCount(Integer connectedCount) {
		this.connectedCount = connectedCount;
	}

}

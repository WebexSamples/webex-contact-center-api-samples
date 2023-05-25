/**
 * Copyright (c) 2022
 * All rights reserved.
 *
 * Permission is hereby granted, free  of charge, to any person obtaining
 * a  copy  of this  software  and  associated  documentation files  (the
 * "Software"), to  deal in  the Software without  restriction, including
 * without limitation  the rights to  use, copy, modify,  merge, publish,
 * distribute,  sublicense, and/or sell  copies of  the Software,  and to
 * permit persons to whom the Software  is furnished to do so.
 *
 * THE  SOFTWARE IS  PROVIDED  "AS  IS", WITHOUT  WARRANTY  OF ANY  KIND,
 * EXPRESS OR  IMPLIED, INCLUDING  BUT NOT LIMITED  TO THE  WARRANTIES OF
 * MERCHANTABILITY,    FITNESS    FOR    A   PARTICULAR    PURPOSE    AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE,  ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

package com.webexcc.api.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactServiceQueue {

	private Boolean active;
	private List<CallDistributionGroup> callDistributionGroups = null;
	private String channelType;
	private Long createdTime;
	private String defaultMusicInQueueMediaFileId;
	private String description;
	private String id;
	private Long lastUpdatedTime;
	private Integer maxActiveContacts;
	private Integer maxTimeInQueue;
	private Boolean monitoringPermitted;
	private String name;
	private Boolean parkingPermitted;
	private Boolean pauseRecordingPermitted;
	private String queueType;
	private Boolean recordingAllCallsPermitted;
	private Integer recordingPauseDuration;
	private Boolean recordingPermitted;
	private String routingType;
	private Integer serviceLevelThreshold;
	private String skillBasedRoutingType;
	private String timezone;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<CallDistributionGroup> getCallDistributionGroups() {
		return callDistributionGroups;
	}

	public void setCallDistributionGroups(List<CallDistributionGroup> callDistributionGroups) {
		this.callDistributionGroups = callDistributionGroups;
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

	public String getDefaultMusicInQueueMediaFileId() {
		return defaultMusicInQueueMediaFileId;
	}

	public void setDefaultMusicInQueueMediaFileId(String defaultMusicInQueueMediaFileId) {
		this.defaultMusicInQueueMediaFileId = defaultMusicInQueueMediaFileId;
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

	public Integer getMaxActiveContacts() {
		return maxActiveContacts;
	}

	public void setMaxActiveContacts(Integer maxActiveContacts) {
		this.maxActiveContacts = maxActiveContacts;
	}

	public Integer getMaxTimeInQueue() {
		return maxTimeInQueue;
	}

	public void setMaxTimeInQueue(Integer maxTimeInQueue) {
		this.maxTimeInQueue = maxTimeInQueue;
	}

	public Boolean getMonitoringPermitted() {
		return monitoringPermitted;
	}

	public void setMonitoringPermitted(Boolean monitoringPermitted) {
		this.monitoringPermitted = monitoringPermitted;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getParkingPermitted() {
		return parkingPermitted;
	}

	public void setParkingPermitted(Boolean parkingPermitted) {
		this.parkingPermitted = parkingPermitted;
	}

	public Boolean getPauseRecordingPermitted() {
		return pauseRecordingPermitted;
	}

	public void setPauseRecordingPermitted(Boolean pauseRecordingPermitted) {
		this.pauseRecordingPermitted = pauseRecordingPermitted;
	}

	public String getQueueType() {
		return queueType;
	}

	public void setQueueType(String queueType) {
		this.queueType = queueType;
	}

	public Boolean getRecordingAllCallsPermitted() {
		return recordingAllCallsPermitted;
	}

	public void setRecordingAllCallsPermitted(Boolean recordingAllCallsPermitted) {
		this.recordingAllCallsPermitted = recordingAllCallsPermitted;
	}

	public Integer getRecordingPauseDuration() {
		return recordingPauseDuration;
	}

	public void setRecordingPauseDuration(Integer recordingPauseDuration) {
		this.recordingPauseDuration = recordingPauseDuration;
	}

	public Boolean getRecordingPermitted() {
		return recordingPermitted;
	}

	public void setRecordingPermitted(Boolean recordingPermitted) {
		this.recordingPermitted = recordingPermitted;
	}

	public String getRoutingType() {
		return routingType;
	}

	public void setRoutingType(String routingType) {
		this.routingType = routingType;
	}

	public Integer getServiceLevelThreshold() {
		return serviceLevelThreshold;
	}

	public void setServiceLevelThreshold(Integer serviceLevelThreshold) {
		this.serviceLevelThreshold = serviceLevelThreshold;
	}

	public String getSkillBasedRoutingType() {
		return skillBasedRoutingType;
	}

	public void setSkillBasedRoutingType(String skillBasedRoutingType) {
		this.skillBasedRoutingType = skillBasedRoutingType;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

}

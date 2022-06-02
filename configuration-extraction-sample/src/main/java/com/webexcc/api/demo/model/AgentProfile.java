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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AgentProfile implements Serializable {
	private final static long serialVersionUID = 5992528992694331067L;

	private String id;
	private String name;
	private String parentType;
	private Boolean active;
	private Boolean agentAvailableAfterOutdial;
	private Boolean allowAutoWrapUpExtension;
	private Boolean autoAnswer;
	private Boolean autoWrapUp;
	private Boolean consultToQueue;
	private Boolean dialPlanEnabled;
	private Boolean lastAgentRouting;
	private Boolean outdialEnabled;
	private Boolean screenPopup;
	private Boolean timeoutDesktopInactivityCustomEnabled;
	private Integer autoWrapAfterSeconds;
	private Long createdTime;
	private Long lastUpdatedTime;
	private String accessBuddyTeam;
	private String accessEntryPoint;
	private String accessIdleCode;
	private String accessQueue;
	private String accessWrapUpCode;
	private String agentDNValidation;
	private String description;
	private ViewableStatistics viewableStatistics;
	private List<Object> agentDNValidationCriterions = new ArrayList<Object>();
	private List<Object> buddyTeams = new ArrayList<Object>();
	private List<Object> dialPlans = new ArrayList<Object>();
	private List<Object> entryPoints = new ArrayList<Object>();
	private List<Object> idleCodes = new ArrayList<Object>();
	private List<Object> queues = new ArrayList<Object>();
	private List<Object> thresholdRules = new ArrayList<Object>();
	private List<Object> wrapUpCodes = new ArrayList<Object>();

	public String getAccessBuddyTeam() {
		return accessBuddyTeam;
	}

	public void setAccessBuddyTeam(String accessBuddyTeam) {
		this.accessBuddyTeam = accessBuddyTeam;
	}

	public String getAccessEntryPoint() {
		return accessEntryPoint;
	}

	public void setAccessEntryPoint(String accessEntryPoint) {
		this.accessEntryPoint = accessEntryPoint;
	}

	public String getAccessIdleCode() {
		return accessIdleCode;
	}

	public void setAccessIdleCode(String accessIdleCode) {
		this.accessIdleCode = accessIdleCode;
	}

	public String getAccessQueue() {
		return accessQueue;
	}

	public void setAccessQueue(String accessQueue) {
		this.accessQueue = accessQueue;
	}

	public String getAccessWrapUpCode() {
		return accessWrapUpCode;
	}

	public void setAccessWrapUpCode(String accessWrapUpCode) {
		this.accessWrapUpCode = accessWrapUpCode;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Boolean getAgentAvailableAfterOutdial() {
		return agentAvailableAfterOutdial;
	}

	public void setAgentAvailableAfterOutdial(Boolean agentAvailableAfterOutdial) {
		this.agentAvailableAfterOutdial = agentAvailableAfterOutdial;
	}

	public String getAgentDNValidation() {
		return agentDNValidation;
	}

	public void setAgentDNValidation(String agentDNValidation) {
		this.agentDNValidation = agentDNValidation;
	}

	public List<Object> getAgentDNValidationCriterions() {
		return agentDNValidationCriterions;
	}

	public void setAgentDNValidationCriterions(List<Object> agentDNValidationCriterions) {
		this.agentDNValidationCriterions = agentDNValidationCriterions;
	}

	public Boolean getAllowAutoWrapUpExtension() {
		return allowAutoWrapUpExtension;
	}

	public void setAllowAutoWrapUpExtension(Boolean allowAutoWrapUpExtension) {
		this.allowAutoWrapUpExtension = allowAutoWrapUpExtension;
	}

	public Boolean getAutoAnswer() {
		return autoAnswer;
	}

	public void setAutoAnswer(Boolean autoAnswer) {
		this.autoAnswer = autoAnswer;
	}

	public Integer getAutoWrapAfterSeconds() {
		return autoWrapAfterSeconds;
	}

	public void setAutoWrapAfterSeconds(Integer autoWrapAfterSeconds) {
		this.autoWrapAfterSeconds = autoWrapAfterSeconds;
	}

	public Boolean getAutoWrapUp() {
		return autoWrapUp;
	}

	public void setAutoWrapUp(Boolean autoWrapUp) {
		this.autoWrapUp = autoWrapUp;
	}

	public List<Object> getBuddyTeams() {
		return buddyTeams;
	}

	public void setBuddyTeams(List<Object> buddyTeams) {
		this.buddyTeams = buddyTeams;
	}

	public Boolean getConsultToQueue() {
		return consultToQueue;
	}

	public void setConsultToQueue(Boolean consultToQueue) {
		this.consultToQueue = consultToQueue;
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

	public Boolean getDialPlanEnabled() {
		return dialPlanEnabled;
	}

	public void setDialPlanEnabled(Boolean dialPlanEnabled) {
		this.dialPlanEnabled = dialPlanEnabled;
	}

	public List<Object> getDialPlans() {
		return dialPlans;
	}

	public void setDialPlans(List<Object> dialPlans) {
		this.dialPlans = dialPlans;
	}

	public List<Object> getEntryPoints() {
		return entryPoints;
	}

	public void setEntryPoints(List<Object> entryPoints) {
		this.entryPoints = entryPoints;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<Object> getIdleCodes() {
		return idleCodes;
	}

	public void setIdleCodes(List<Object> idleCodes) {
		this.idleCodes = idleCodes;
	}

	public Boolean getLastAgentRouting() {
		return lastAgentRouting;
	}

	public void setLastAgentRouting(Boolean lastAgentRouting) {
		this.lastAgentRouting = lastAgentRouting;
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

	public Boolean getOutdialEnabled() {
		return outdialEnabled;
	}

	public void setOutdialEnabled(Boolean outdialEnabled) {
		this.outdialEnabled = outdialEnabled;
	}

	public String getParentType() {
		return parentType;
	}

	public void setParentType(String parentType) {
		this.parentType = parentType;
	}

	public List<Object> getQueues() {
		return queues;
	}

	public void setQueues(List<Object> queues) {
		this.queues = queues;
	}

	public Boolean getScreenPopup() {
		return screenPopup;
	}

	public void setScreenPopup(Boolean screenPopup) {
		this.screenPopup = screenPopup;
	}

	public List<Object> getThresholdRules() {
		return thresholdRules;
	}

	public void setThresholdRules(List<Object> thresholdRules) {
		this.thresholdRules = thresholdRules;
	}

	public Boolean getTimeoutDesktopInactivityCustomEnabled() {
		return timeoutDesktopInactivityCustomEnabled;
	}

	public void setTimeoutDesktopInactivityCustomEnabled(Boolean timeoutDesktopInactivityCustomEnabled) {
		this.timeoutDesktopInactivityCustomEnabled = timeoutDesktopInactivityCustomEnabled;
	}

	public ViewableStatistics getViewableStatistics() {
		return viewableStatistics;
	}

	public void setViewableStatistics(ViewableStatistics viewableStatistics) {
		this.viewableStatistics = viewableStatistics;
	}

	public List<Object> getWrapUpCodes() {
		return wrapUpCodes;
	}

	public void setWrapUpCodes(List<Object> wrapUpCodes) {
		this.wrapUpCodes = wrapUpCodes;
	}

}

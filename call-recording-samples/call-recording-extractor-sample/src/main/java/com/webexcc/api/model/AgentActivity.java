package com.webexcc.api.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class AgentActivity {

	private boolean active;
	private String agentId;
	private String agentDn;
	private String agentLogin;
	private String agentName;
	private String currentState;
	private String siteId;
	private String siteName;
	private String teamId;
	private String teamName;
	private int isLogin;
	private String taskId;
	private String channelId;
	private String channelType;
	private String subChannelType;
	private String idleCodeName;
	private String idleCode;
	private String queueId;
	private String queueName;
	private String wrapupCodeName;
	private String reason;
	private String startTime;
	private String endTime;
	private String mmProfileType;
	private String agentSessionId;

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getAgentId() {
		return agentId;
	}

	public void setAgentSessionId(String agentSessionId) {
		this.agentSessionId = agentSessionId;
	}

	public String getAgentSessionId() {
		return agentSessionId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	public String getAgentDn() {
		return agentDn;
	}

	public void setAgentDn(String agentDn) {
		this.agentDn = agentDn;
	}

	public String getAgentLogin() {
		return agentLogin;
	}

	public void setAgentLogin(String agentLogin) {
		this.agentLogin = agentLogin;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getCurrentState() {
		return currentState;
	}

	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getTeamId() {
		return teamId;
	}

	public void setTeamId(String teamId) {
		this.teamId = teamId;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public int getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(int isLogin) {
		this.isLogin = isLogin;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getChannelType() {
		return channelType;
	}

	public void setChannelType(String channelType) {
		this.channelType = channelType;
	}

	public String getSubChannelType() {
		return subChannelType;
	}

	public void setSubChannelType(String subChannelType) {
		this.subChannelType = subChannelType;
	}

	public String getIdleCodeName() {
		return idleCodeName;
	}

	public void setIdleCodeName(String idleCodeName) {
		this.idleCodeName = idleCodeName;
	}

	public String getIdleCode() {
		return idleCode;
	}

	public void setIdleCode(String idleCode) {
		this.idleCode = idleCode;
	}

	public String getQueueId() {
		return queueId;
	}

	public void setQueueId(String queueId) {
		this.queueId = queueId;
	}

	public String getQueueName() {
		return queueName;
	}

	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}

	public String getWrapupCodeName() {
		return wrapupCodeName;
	}

	public void setWrapupCodeName(String wrapupCodeName) {
		this.wrapupCodeName = wrapupCodeName;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getMmProfileType() {
		return mmProfileType;
	}

	public void setMmProfileType(String mmProfileType) {
		this.mmProfileType = mmProfileType;
	}

}

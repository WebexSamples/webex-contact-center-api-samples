package com.webexcc.api.demo.model;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class AgentSessions {
	public boolean isActive;
	public String agentId;
	public String agentName;
	public String agentSessionId;
	public String agentSignOutReason;
	public String userLoginId;
	public long endTime;
	public long startTime;
	public String state;
	public String siteId;
	public String siteName;
	public String teamId;
	public String teamName;
	public String orgId;
	public String orgName;
	public String multiMediaProfileType;
//	public Object skillsProfile;
//    public ArrayList<Object> agentSkills;
	public String parentOrgId;
	public String parentOrgName;
//	public ArrayList<ChannelInfo> channelInfo;
	public int intervalStartTime;
	public Object aggregation;

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getAgentId() {
		return agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getAgentSessionId() {
		return agentSessionId;
	}

	public void setAgentSessionId(String agentSessionId) {
		this.agentSessionId = agentSessionId;
	}

	public String getAgentSignOutReason() {
		return agentSignOutReason;
	}

	public void setAgentSignOutReason(String agentSignOutReason) {
		this.agentSignOutReason = agentSignOutReason;
	}

	public String getUserLoginId() {
		return userLoginId;
	}

	public void setUserLoginId(String userLoginId) {
		this.userLoginId = userLoginId;
	}

	public long getEndTime() {
		return endTime;
	}

	public void setEndTime(long endTime) {
		this.endTime = endTime;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getMultiMediaProfileType() {
		return multiMediaProfileType;
	}

	public void setMultiMediaProfileType(String multiMediaProfileType) {
		this.multiMediaProfileType = multiMediaProfileType;
	}


	public String getParentOrgId() {
		return parentOrgId;
	}

	public void setParentOrgId(String parentOrgId) {
		this.parentOrgId = parentOrgId;
	}

	public String getParentOrgName() {
		return parentOrgName;
	}

	public void setParentOrgName(String parentOrgName) {
		this.parentOrgName = parentOrgName;
	}

	public int getIntervalStartTime() {
		return intervalStartTime;
	}

	public void setIntervalStartTime(int intervalStartTime) {
		this.intervalStartTime = intervalStartTime;
	}

	public Object getAggregation() {
		return aggregation;
	}

	public void setAggregation(Object aggregation) {
		this.aggregation = aggregation;
	}

//	public Object getSkillsProfile() {
//		return skillsProfile;
//	}
//
//	public void setSkillsProfile(Object skillsProfile) {
//		this.skillsProfile = skillsProfile;
//	}

//	public ArrayList<ChannelInfo> getChannelInfo() {
//		return channelInfo;
//	}
//
//	public void setChannelInfo(ArrayList<ChannelInfo> channelInfo) {
//		this.channelInfo = channelInfo;
//	}

}

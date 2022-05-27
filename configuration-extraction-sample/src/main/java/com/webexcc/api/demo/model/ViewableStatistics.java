
package com.webexcc.api.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ViewableStatistics implements Serializable {

	private String accessQueueStats;
	private String accessTeamStats;
	private Boolean agentStats;
	private List<Object> contactServiceQueues = new ArrayList<Object>();
	private String id;
	private Boolean loggedInTeamStats;
	private List<Object> teams = new ArrayList<Object>();
	private final static long serialVersionUID = 3886687920637366161L;

	public String getAccessQueueStats() {
		return accessQueueStats;
	}

	public void setAccessQueueStats(String accessQueueStats) {
		this.accessQueueStats = accessQueueStats;
	}

	public String getAccessTeamStats() {
		return accessTeamStats;
	}

	public void setAccessTeamStats(String accessTeamStats) {
		this.accessTeamStats = accessTeamStats;
	}

	public Boolean getAgentStats() {
		return agentStats;
	}

	public void setAgentStats(Boolean agentStats) {
		this.agentStats = agentStats;
	}

	public List<Object> getContactServiceQueues() {
		return contactServiceQueues;
	}

	public void setContactServiceQueues(List<Object> contactServiceQueues) {
		this.contactServiceQueues = contactServiceQueues;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getLoggedInTeamStats() {
		return loggedInTeamStats;
	}

	public void setLoggedInTeamStats(Boolean loggedInTeamStats) {
		this.loggedInTeamStats = loggedInTeamStats;
	}

	public List<Object> getTeams() {
		return teams;
	}

	public void setTeams(List<Object> teams) {
		this.teams = teams;
	}

}

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

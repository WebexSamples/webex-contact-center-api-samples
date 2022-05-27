
package com.webexcc.api.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class CallDistributionGroup {

	private List<AgentGroup> agentGroups = null;
	private Integer duration;
	private Integer order;

	public List<AgentGroup> getAgentGroups() {
		return agentGroups;
	}

	public void setAgentGroups(List<AgentGroup> agentGroups) {
		this.agentGroups = agentGroups;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

}

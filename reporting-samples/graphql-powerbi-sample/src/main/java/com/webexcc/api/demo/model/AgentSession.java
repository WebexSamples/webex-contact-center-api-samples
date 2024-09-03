package com.webexcc.api.demo.model;

import java.util.ArrayList;

public class AgentSession {
	public ArrayList<AgentSessions> agentSessions;
	public PageInfo pageInfo;

	public ArrayList<AgentSessions> getAgentSessions() {
		return agentSessions;
	}

	public void setAgentSessions(ArrayList<AgentSessions> agentSessions) {
		this.agentSessions = agentSessions;
	}

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}
}

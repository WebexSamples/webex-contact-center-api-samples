package com.webexcc.api.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class AgentsActivity {
	private Organization meta;
	private List<AgentActivity> data;

	public Organization getMeta() {
		return meta;
	}

	public void setMeta(Organization meta) {
		this.meta = meta;
	}

	public List<AgentActivity> getData() {
		return data;
	}

	public void setData(List<AgentActivity> data) {
		this.data = data;
	}
}

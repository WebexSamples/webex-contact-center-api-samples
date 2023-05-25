package com.webexcc.api.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

//import com.fasterxml.jackson.databind.ObjectMapper; // version 2.11.1
//import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
/* ObjectMapper om = new ObjectMapper();
Root root = om.readValue(myJsonString), AgentsActivities.class); */

@JsonInclude(Include.NON_NULL)
public class AgentsActivities {
	private Organization meta;
	private List<AgentActivity> data = new ArrayList<>();

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

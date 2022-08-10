
package com.webexcc.api.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

 @JsonIgnoreProperties(ignoreUnknown = true)
public class Tasks implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 5892004439165072763L;
	private PageInfo pageInfo;
	private List<Task> tasks = new ArrayList<>();

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

}

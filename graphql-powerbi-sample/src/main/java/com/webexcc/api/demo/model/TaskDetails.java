
package com.webexcc.api.demo.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

 @JsonIgnoreProperties(ignoreUnknown = true)
public class TaskDetails implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -8968245655352859868L;
	private List<Task> tasks = null;

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

}

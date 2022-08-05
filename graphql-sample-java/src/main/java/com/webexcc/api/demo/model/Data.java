
package com.webexcc.api.demo.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

 @JsonIgnoreProperties(ignoreUnknown = true)
public class Data implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 5861647038550890545L;
	private Tasks task;
	private TaskDetails taskDetails;

	public Tasks getTask() {
		return task;
	}

	public TaskDetails getTaskDetails() {
		return taskDetails;
	}

	public void setTask(Tasks task) {
		this.task = task;
	}

	public void setTaskDetails(TaskDetails taskDetails) {
		this.taskDetails = taskDetails;
	}

}

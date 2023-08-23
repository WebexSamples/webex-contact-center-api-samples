package com.webexcc.api.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Capture {

	private String taskId;
	private List<Recording> recording;
	private List<Transcription> transcription;

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public List<Recording> getRecording() {
		return recording;
	}

	public void setRecording(List<Recording> recording) {
		this.recording = recording;
	}

	public List<Transcription> getTranscription() {
		return transcription;
	}

	public void setTranscription(List<Transcription> transcription) {
		this.transcription = transcription;
	}
}

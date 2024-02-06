package com.webexcc.api.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CaptureAttributes {

	private String fileName;
	private String filePath;
	private String startTime;
	private String stopTime;
	private List<String> participants;
	private String channel1;
	private String channel2;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getStopTime() {
		return stopTime;
	}

	public void setStopTime(String stopTime) {
		this.stopTime = stopTime;
	}

	public List<String> getParticipants() {
		return participants;
	}

	public void setParticipants(List<String> participants) {
		this.participants = participants;
	}

	public String getChannel1() {
		return channel1;
	}

	public void setChannel1(String channel1) {
		this.channel1 = channel1;
	}

	public String getChannel2() {
		return channel2;
	}

	public void setChannel2(String channel2) {
		this.channel2 = channel2;
	}
}

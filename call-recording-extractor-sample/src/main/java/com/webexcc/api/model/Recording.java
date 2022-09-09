package com.webexcc.api.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Recording {

	private String id;
	private boolean segment;
	private CaptureAttributes attributes;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isSegment() {
		return segment;
	}

	public void setSegment(boolean segment) {
		this.segment = segment;
	}

	public CaptureAttributes getAttributes() {
		return attributes;
	}

	public void setAttributes(CaptureAttributes attributes) {
		this.attributes = attributes;
	}

}

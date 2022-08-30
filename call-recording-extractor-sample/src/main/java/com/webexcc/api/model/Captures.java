package com.webexcc.api.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Captures {
	private Organization meta;
	private List<Capture> data = new ArrayList<>();

	public Organization getMeta() {
		return meta;
	}

	public void setMeta(Organization meta) {
		this.meta = meta;
	}

	public List<Capture> getData() {
		return data;
	}

	public void setData(List<Capture> data) {
		this.data = data;
	}
}

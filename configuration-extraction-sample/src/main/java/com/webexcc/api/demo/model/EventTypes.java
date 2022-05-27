
package com.webexcc.api.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class EventTypes {

	private List<DatumEventTypes> data = null;
	private MetaEventTypes meta;

	public List<DatumEventTypes> getData() {
		return data;
	}

	public void setData(List<DatumEventTypes> data) {
		this.data = data;
	}

	public MetaEventTypes getMeta() {
		return meta;
	}

	public void setMeta(MetaEventTypes meta) {
		this.meta = meta;
	}

}

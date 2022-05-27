
package com.webexcc.api.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Task {

	private List<DatumTask> data = null;
	private MetaTask meta;

	public List<DatumTask> getData() {
		return data;
	}

	public void setData(List<DatumTask> data) {
		this.data = data;
	}

	public MetaTask getMeta() {
		return meta;
	}

	public void setMeta(MetaTask meta) {
		this.meta = meta;
	}

}

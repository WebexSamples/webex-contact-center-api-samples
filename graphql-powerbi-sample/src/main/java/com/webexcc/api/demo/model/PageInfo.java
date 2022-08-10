
package com.webexcc.api.demo.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

 @JsonIgnoreProperties(ignoreUnknown = true)
public class PageInfo implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -5399968103649499030L;
	private String endCursor;
	private Boolean hasNextPage;

	public String getEndCursor() {
		return endCursor;
	}

	public Boolean getHasNextPage() {
		return hasNextPage;
	}

	public void setEndCursor(String endCursor) {
		this.endCursor = endCursor;
	}

	public void setHasNextPage(Boolean hasNextPage) {
		this.hasNextPage = hasNextPage;
	}

}

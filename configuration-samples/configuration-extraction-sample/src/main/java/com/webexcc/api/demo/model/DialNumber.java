/**
 * Copyright (c) 2022
 * All rights reserved.
 *
 * Permission is hereby granted, free  of charge, to any person obtaining
 * a  copy  of this  software  and  associated  documentation files  (the
 * "Software"), to  deal in  the Software without  restriction, including
 * without limitation  the rights to  use, copy, modify,  merge, publish,
 * distribute,  sublicense, and/or sell  copies of  the Software,  and to
 * permit persons to whom the Software  is furnished to do so.
 *
 * THE  SOFTWARE IS  PROVIDED  "AS  IS", WITHOUT  WARRANTY  OF ANY  KIND,
 * EXPRESS OR  IMPLIED, INCLUDING  BUT NOT LIMITED  TO THE  WARRANTIES OF
 * MERCHANTABILITY,    FITNESS    FOR    A   PARTICULAR    PURPOSE    AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE,  ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DialNumber {

	private Long createdTime;
	private String dialledNumber;
	private String entryPointId;
	private String id;
	private Long lastUpdatedTime;
	private String routePointId;

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public String getDialledNumber() {
		return dialledNumber;
	}

	public void setDialledNumber(String dialledNumber) {
		this.dialledNumber = dialledNumber;
	}

	public String getEntryPointId() {
		return entryPointId;
	}

	public void setEntryPointId(String entryPointId) {
		this.entryPointId = entryPointId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(Long lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public String getRoutePointId() {
		return routePointId;
	}

	public void setRoutePointId(String routePointId) {
		this.routePointId = routePointId;
	}

}

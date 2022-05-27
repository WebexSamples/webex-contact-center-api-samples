
package com.webexcc.api.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class AddressBook implements Serializable {

	private List<AddressBookEntry> addressBookEntries = new ArrayList<AddressBookEntry>();
	private Long createdTime;
	private String description;
	private String id;
	private Long lastUpdatedTime;
	private String name;
	private String parentType;
	private final static long serialVersionUID = 4574255452514500890L;

	public List<AddressBookEntry> getAddressBookEntries() {
		return addressBookEntries;
	}

	public void setAddressBookEntries(List<AddressBookEntry> addressBookEntries) {
		this.addressBookEntries = addressBookEntries;
	}

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentType() {
		return parentType;
	}

	public void setParentType(String parentType) {
		this.parentType = parentType;
	}

}


package com.webexcc.api.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MultimediaProfile {

	private Boolean active;
	private String blendingMode;
	private Boolean blendingModeEnabled;
	private Integer chat;
	private Long createdTime;
	private String description;
	private Integer email;
	private Integer fax;
	private String id;
	private Long lastUpdatedTime;
	private String name;
	private Integer others;
	private Integer social;
	private Integer telephony;
	private Integer video;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getBlendingMode() {
		return blendingMode;
	}

	public void setBlendingMode(String blendingMode) {
		this.blendingMode = blendingMode;
	}

	public Boolean getBlendingModeEnabled() {
		return blendingModeEnabled;
	}

	public void setBlendingModeEnabled(Boolean blendingModeEnabled) {
		this.blendingModeEnabled = blendingModeEnabled;
	}

	public Integer getChat() {
		return chat;
	}

	public void setChat(Integer chat) {
		this.chat = chat;
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

	public Integer getEmail() {
		return email;
	}

	public void setEmail(Integer email) {
		this.email = email;
	}

	public Integer getFax() {
		return fax;
	}

	public void setFax(Integer fax) {
		this.fax = fax;
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

	public Integer getOthers() {
		return others;
	}

	public void setOthers(Integer others) {
		this.others = others;
	}

	public Integer getSocial() {
		return social;
	}

	public void setSocial(Integer social) {
		this.social = social;
	}

	public Integer getTelephony() {
		return telephony;
	}

	public void setTelephony(Integer telephony) {
		this.telephony = telephony;
	}

	public Integer getVideo() {
		return video;
	}

	public void setVideo(Integer video) {
		this.video = video;
	}

}

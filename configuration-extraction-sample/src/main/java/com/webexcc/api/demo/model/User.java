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

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

	private Boolean active;
	private String agentProfileId;
	private String ciUserId;
	private Boolean contactCenterEnabled;
	private Long createdTime;
	private String deafultDialledNumber;
	private String email;
	private String externalIdentifier;
	private String firstName;
	private String id;
	private Boolean imiUserCreated;
	private String lastName;
	private Long lastUpdatedTime;
	private String mobile;
	private String multimediaProfileId;
	private String siteId;
	private String subscriptionId;
	private List<String> teamIds = null;
	private String userProfileId;
	private String workPhone;
	private String xspVersion;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getAgentProfileId() {
		return agentProfileId;
	}

	public void setAgentProfileId(String agentProfileId) {
		this.agentProfileId = agentProfileId;
	}

	public String getCiUserId() {
		return ciUserId;
	}

	public void setCiUserId(String ciUserId) {
		this.ciUserId = ciUserId;
	}

	public Boolean getContactCenterEnabled() {
		return contactCenterEnabled;
	}

	public void setContactCenterEnabled(Boolean contactCenterEnabled) {
		this.contactCenterEnabled = contactCenterEnabled;
	}

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public String getDeafultDialledNumber() {
		return deafultDialledNumber;
	}

	public void setDeafultDialledNumber(String deafultDialledNumber) {
		this.deafultDialledNumber = deafultDialledNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getExternalIdentifier() {
		return externalIdentifier;
	}

	public void setExternalIdentifier(String externalIdentifier) {
		this.externalIdentifier = externalIdentifier;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Boolean getImiUserCreated() {
		return imiUserCreated;
	}

	public void setImiUserCreated(Boolean imiUserCreated) {
		this.imiUserCreated = imiUserCreated;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(Long lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMultimediaProfileId() {
		return multimediaProfileId;
	}

	public void setMultimediaProfileId(String multimediaProfileId) {
		this.multimediaProfileId = multimediaProfileId;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getSubscriptionId() {
		return subscriptionId;
	}

	public void setSubscriptionId(String subscriptionId) {
		this.subscriptionId = subscriptionId;
	}

	public List<String> getTeamIds() {
		return teamIds;
	}

	public void setTeamIds(List<String> teamIds) {
		this.teamIds = teamIds;
	}

	public String getUserProfileId() {
		return userProfileId;
	}

	public void setUserProfileId(String userProfileId) {
		this.userProfileId = userProfileId;
	}

	public String getWorkPhone() {
		return workPhone;
	}

	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}

	public String getXspVersion() {
		return xspVersion;
	}

	public void setXspVersion(String xspVersion) {
		this.xspVersion = xspVersion;
	}

}

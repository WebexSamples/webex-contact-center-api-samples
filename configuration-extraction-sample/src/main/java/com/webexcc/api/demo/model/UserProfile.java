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

public class UserProfile {

	private String accessAllEntryPoints;
	private String accessAllModules;
	private String accessAllQueues;
	private String accessAllSites;
	private String accessAllTeams;
	private Boolean active;
	private Long createdTime;
	private String description;
	private List<Object> editableFolderIds = null;
	private List<Object> entryPoints = null;
	private String id;
	private Long lastUpdatedTime;
	private String name;
	private String profileType;
	private List<Object> queues = null;
	private List<Object> sites = null;
	private List<Object> teams = null;
	private List<UserProfileAppModule> userProfileAppModules = null;

	public String getAccessAllEntryPoints() {
		return accessAllEntryPoints;
	}

	public void setAccessAllEntryPoints(String accessAllEntryPoints) {
		this.accessAllEntryPoints = accessAllEntryPoints;
	}

	public String getAccessAllModules() {
		return accessAllModules;
	}

	public void setAccessAllModules(String accessAllModules) {
		this.accessAllModules = accessAllModules;
	}

	public String getAccessAllQueues() {
		return accessAllQueues;
	}

	public void setAccessAllQueues(String accessAllQueues) {
		this.accessAllQueues = accessAllQueues;
	}

	public String getAccessAllSites() {
		return accessAllSites;
	}

	public void setAccessAllSites(String accessAllSites) {
		this.accessAllSites = accessAllSites;
	}

	public String getAccessAllTeams() {
		return accessAllTeams;
	}

	public void setAccessAllTeams(String accessAllTeams) {
		this.accessAllTeams = accessAllTeams;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
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

	public List<Object> getEditableFolderIds() {
		return editableFolderIds;
	}

	public void setEditableFolderIds(List<Object> editableFolderIds) {
		this.editableFolderIds = editableFolderIds;
	}

	public List<Object> getEntryPoints() {
		return entryPoints;
	}

	public void setEntryPoints(List<Object> entryPoints) {
		this.entryPoints = entryPoints;
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

	public String getProfileType() {
		return profileType;
	}

	public void setProfileType(String profileType) {
		this.profileType = profileType;
	}

	public List<Object> getQueues() {
		return queues;
	}

	public void setQueues(List<Object> queues) {
		this.queues = queues;
	}

	public List<Object> getSites() {
		return sites;
	}

	public void setSites(List<Object> sites) {
		this.sites = sites;
	}

	public List<Object> getTeams() {
		return teams;
	}

	public void setTeams(List<Object> teams) {
		this.teams = teams;
	}

	public List<UserProfileAppModule> getUserProfileAppModules() {
		return userProfileAppModules;
	}

	public void setUserProfileAppModules(List<UserProfileAppModule> userProfileAppModules) {
		this.userProfileAppModules = userProfileAppModules;
	}

}

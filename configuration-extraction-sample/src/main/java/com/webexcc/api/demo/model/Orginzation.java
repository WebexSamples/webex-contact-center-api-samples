
package com.webexcc.api.demo.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Orginzation implements Serializable {

	private Boolean active;
	private String contactCenterType;
	private Long createdTime;
	private Integer deleteOn;
	private String domainName;
	private String environment;
	private String id;
	private String imiOnboardStatus;
	private Long lastUpdatedTime;
	private String name;
	private String orgType;
	private String parentTenantId;
	private String partnerOrgId;
	private String provisionStatus;
	private String subscriptionStateTimestamp;
	private String subscriptionType;
	private String tenantId;
	private String tenantType;
	private String timezone;
	private final static long serialVersionUID = -4255642057078826622L;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getContactCenterType() {
		return contactCenterType;
	}

	public void setContactCenterType(String contactCenterType) {
		this.contactCenterType = contactCenterType;
	}

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}

	public Integer getDeleteOn() {
		return deleteOn;
	}

	public void setDeleteOn(Integer deleteOn) {
		this.deleteOn = deleteOn;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getImiOnboardStatus() {
		return imiOnboardStatus;
	}

	public void setImiOnboardStatus(String imiOnboardStatus) {
		this.imiOnboardStatus = imiOnboardStatus;
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

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	public String getParentTenantId() {
		return parentTenantId;
	}

	public void setParentTenantId(String parentTenantId) {
		this.parentTenantId = parentTenantId;
	}

	public String getPartnerOrgId() {
		return partnerOrgId;
	}

	public void setPartnerOrgId(String partnerOrgId) {
		this.partnerOrgId = partnerOrgId;
	}

	public String getProvisionStatus() {
		return provisionStatus;
	}

	public void setProvisionStatus(String provisionStatus) {
		this.provisionStatus = provisionStatus;
	}

	public String getSubscriptionStateTimestamp() {
		return subscriptionStateTimestamp;
	}

	public void setSubscriptionStateTimestamp(String subscriptionStateTimestamp) {
		this.subscriptionStateTimestamp = subscriptionStateTimestamp;
	}

	public String getSubscriptionType() {
		return subscriptionType;
	}

	public void setSubscriptionType(String subscriptionType) {
		this.subscriptionType = subscriptionType;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getTenantType() {
		return tenantType;
	}

	public void setTenantType(String tenantType) {
		this.tenantType = tenantType;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

}

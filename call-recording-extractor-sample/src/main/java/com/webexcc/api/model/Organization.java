package com.webexcc.api.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Organization implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 3777596416222355052L;
	private String orgId;
	private String urlExpiration;
	private String href;

	private String id;
	private String partnerOrgId;
	private String tenantId;
	private String parentTenantId;
	private String name;
	private String domainName;
	private String timezone;
	private String tenantType;
	private boolean active;
	private String environment;
	private String subscriptionType;
	private String orgType;
	private String provisionStatus;
	private String imiOnboardStatus;
	private String subscriptionStateTimestamp;
	private String subscriptionLimit;
	private String subscriptionCount;
	private String contactCenterType;
	private int deleteOn;
	private long createdTime;
	private long lastUpdatedTime;

	public Organization() {
		super();

	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getUrlExpiration() {
		return urlExpiration;
	}

	public void setUrlExpiration(String urlExpiration) {
		this.urlExpiration = urlExpiration;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPartnerOrgId() {
		return partnerOrgId;
	}

	public void setPartnerOrgId(String partnerOrgId) {
		this.partnerOrgId = partnerOrgId;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public String getParentTenantId() {
		return parentTenantId;
	}

	public void setParentTenantId(String parentTenantId) {
		this.parentTenantId = parentTenantId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public String getTenantType() {
		return tenantType;
	}

	public void setTenantType(String tenantType) {
		this.tenantType = tenantType;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
	}

	public String getSubscriptionType() {
		return subscriptionType;
	}

	public void setSubscriptionType(String subscriptionType) {
		this.subscriptionType = subscriptionType;
	}

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	public String getProvisionStatus() {
		return provisionStatus;
	}

	public void setProvisionStatus(String provisionStatus) {
		this.provisionStatus = provisionStatus;
	}

	public String getImiOnboardStatus() {
		return imiOnboardStatus;
	}

	public void setImiOnboardStatus(String imiOnboardStatus) {
		this.imiOnboardStatus = imiOnboardStatus;
	}

	public String getSubscriptionStateTimestamp() {
		return subscriptionStateTimestamp;
	}

	public void setSubscriptionStateTimestamp(String subscriptionStateTimestamp) {
		this.subscriptionStateTimestamp = subscriptionStateTimestamp;
	}

	public String getSubscriptionLimit() {
		return subscriptionLimit;
	}

	public void setSubscriptionLimit(String subscriptionLimit) {
		this.subscriptionLimit = subscriptionLimit;
	}

	public String getSubscriptionCount() {
		return subscriptionCount;
	}

	public void setSubscriptionCount(String subscriptionCount) {
		this.subscriptionCount = subscriptionCount;
	}

	public int getDeleteOn() {
		return deleteOn;
	}

	public void setDeleteOn(int deleteOn) {
		this.deleteOn = deleteOn;
	}

	public long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(long createdTime) {
		this.createdTime = createdTime;
	}

	public long getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(long lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public String getContactCenterType() {
		return contactCenterType;
	}

	public void setContactCenterType(String contactCenterType) {
		this.contactCenterType = contactCenterType;
	}

}
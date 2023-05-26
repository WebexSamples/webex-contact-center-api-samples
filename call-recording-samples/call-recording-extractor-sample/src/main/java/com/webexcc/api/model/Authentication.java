package com.webexcc.api.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Authentication implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = -3871560246092973086L;
	private String access_token;
	private long expires_in;
	private String refresh_token;
	private String refresh_token_expires_in;
	private String token_type;
	private String orginzationId;
	private String code;
	private long loginTimestamp;
	private String scope;

	public String getAccess_token() {
		return access_token;
	}

	public String getCode() {
		return code;
	}

	public long getExpires_in() {
		return expires_in;
	}

	public long getLoginTimestamp() {
		return loginTimestamp;
	}

	public String getOrginzationId() {
		return orginzationId;
	}

	public String getRefresh_token() {
		return refresh_token;
	}

	public String getRefresh_token_expires_in() {
		return refresh_token_expires_in;
	}

	public String getToken_type() {
		return token_type;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setExpires_in(long expires_in) {
		setLoginTimestamp(System.currentTimeMillis());
		this.expires_in = expires_in;
	}

	public void setLoginTimestamp(long loginTimestamp) {
		this.loginTimestamp = loginTimestamp;
	}

	public void setOrginzationId(String orginzationId) {
		this.orginzationId = orginzationId;
	}

	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}

	public void setRefresh_token_expires_in(String refresh_token_expires_in) {
		this.refresh_token_expires_in = refresh_token_expires_in;
	}

	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}

	@Override
	public String toString() {
		return "Authentication [" + "\naccess_token=" + access_token + "" + "\nexpires_in=" + expires_in + "" + "\nrefresh_token=" + refresh_token + "" + "\nrefresh_token_expires_in=" + refresh_token_expires_in + ""
				+ "\ntoken_type=" + token_type + "\norginzationId=" + orginzationId + "\nloginTimestamp=" + loginTimestamp + "\n]";
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

}

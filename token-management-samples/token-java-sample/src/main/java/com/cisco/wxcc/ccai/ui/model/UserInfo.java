package com.cisco.wxcc.ccai.ui.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfo {

	private String userId;

	private String userName;

	private String displayName;

	private String orgId;

	private String accessToken;
	
	private String logoutUrl;
}

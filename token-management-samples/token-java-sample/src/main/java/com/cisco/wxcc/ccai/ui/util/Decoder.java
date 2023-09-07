package com.cisco.wxcc.ccai.ui.util;

import java.util.Base64;

public class Decoder {

	public static String decodeOrgId(String orgId) {
		String decoded = decode(orgId);
		try {
			decoded = decoded.substring(decoded.lastIndexOf("/") + 1);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return decoded; 
	}

	public static String decodeUserId(String userId) {
		String decoded = decode(userId);
		try {
			decoded = decoded.substring(decoded.lastIndexOf("/") + 1);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return decoded;
	}

	public static String decode(String encoded) {
		String decoded = null;
		try {
			decoded = new String(Base64.getDecoder().decode(encoded));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return decoded;
	}
}

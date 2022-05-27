package com.webexcc.api.demo.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public class Subscriptions extends ApiService {
	static Logger logger = LoggerFactory.getLogger(Subscriptions.class);

	public Subscriptions() {
	}

	void getAllSubscriptions() throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL2 + "/subscriptions?" + "&orgId=" + orginzationId + "", HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAllSubscriptions();
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
			new Subscriptions().getAllSubscriptions();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

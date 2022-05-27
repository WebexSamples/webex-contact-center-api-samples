package com.webexcc.api.demo.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.MapperFeature;

public class EventTypes extends ApiService {
	static Logger logger = LoggerFactory.getLogger(EventTypes.class);

	public EventTypes() {
	}

	void getAllEventTypes() throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL2 + "/event-types?" + "&orgId=" + orginzationId + "", HttpMethod.GET, entity, String.class);
			logger.info("response1.getBody:{}", response1.getBody());
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			com.webexcc.api.demo.model.EventTypes o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.EventTypes.class);
			logger.info("EventTypes:{}", o);

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAllEventTypes();
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
			new EventTypes().getAllEventTypes();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

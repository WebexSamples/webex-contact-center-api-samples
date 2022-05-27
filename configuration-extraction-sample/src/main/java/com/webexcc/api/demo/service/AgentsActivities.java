package com.webexcc.api.demo.service;

import java.util.Calendar;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public class AgentsActivities extends ApiService {
	static Logger logger = LoggerFactory.getLogger(AgentsActivities.class);

	public AgentsActivities() {
	}

	void getAgentsActivitiesByFromTo(long from, long to, int pageSize) throws Exception {
		String url = "";
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			url = baseURL2 + "/agents/activities?channelTypes=telephony" + "&from=" + from + "&to=" + to + "&pageSize=" + pageSize + "&orgId=" + orginzationId;
			ResponseEntity<String> response1 = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAgentsActivitiesByFromTo(from, to, +pageSize);
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
			Calendar cal = Calendar.getInstance();
			long to = cal.getTimeInMillis();
			cal.set(Calendar.HOUR_OF_DAY, -8);
			long from = cal.getTimeInMillis();

			new AgentsActivities().getAgentsActivitiesByFromTo(from, to, 900);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

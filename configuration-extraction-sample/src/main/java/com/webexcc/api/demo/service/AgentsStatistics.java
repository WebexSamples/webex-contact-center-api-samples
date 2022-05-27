package com.webexcc.api.demo.service;

import java.util.Calendar;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public class AgentsStatistics extends ApiService {
	static Logger logger = LoggerFactory.getLogger(AgentsStatistics.class);

	public AgentsStatistics() {
	}

	void getAgentsStatistics(long from, long to) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL2 + "/agents/statistics?orgId=" + orginzationId + "&from=" + from + "&to=" + to + "&interval=15", HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAgentsStatistics(from, to);
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
			/**
			 * NOT verified
			 */
			Calendar cal = Calendar.getInstance();
			long to = cal.getTimeInMillis();
			cal.set(Calendar.HOUR_OF_DAY, -24);
			long from = cal.getTimeInMillis();
			new AgentsStatistics().getAgentsStatistics(from, to);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

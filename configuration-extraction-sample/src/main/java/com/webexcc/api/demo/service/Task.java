package com.webexcc.api.demo.service;

import java.util.Calendar;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.MapperFeature;

public class Task extends ApiService {
	static Logger logger = LoggerFactory.getLogger(Task.class);

	public Task() {
	}

	void getTasksByFromTo(long from, long to, int pageSize) throws Exception {
		String url = "";
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			url = baseURL2 + "/tasks?channelTypes=telephony" + "&from=" + from + "&to=" + to + "&pageSize=" + pageSize + "&orgId=" + orginzationId;
			ResponseEntity<String> response1 = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			com.webexcc.api.demo.model.Task o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.Task.class);
			logger.info("Task:{}", o);

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getTasksByFromTo(from, to, pageSize);
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
			new Task().getTasksByFromTo(from, to, 22);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

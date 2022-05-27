package com.webexcc.api.demo.service;

import java.util.Arrays;
import java.util.Calendar;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public class QueueStatistics extends ApiService {
	static Logger logger = LoggerFactory.getLogger(QueueStatistics.class);

	public QueueStatistics() {
	}

	void getQueueStatisticsByFromTo(long from, long to, String interval, String queueIds) throws Exception {
		String url = "";
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			url = baseURL2 + "/queues/statistics?from=" + from + "&to=" + to + "&interval=" + interval + "&queueIds=" + queueIds;
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
				getQueueStatisticsByFromTo(from, to, interval, queueIds);
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
//--url'https://api.wxcc-us1.cisco.com/v1/queues/statistics?from=1651395600000&to=1651438800000&interval=15&queueIds=89cf3b93-f020-42c6-84dc-87db6a92eae7, 89cf3b93-f020-42c6-84dc-87db6a92fae7, 89cf3b93-f020-42c6-84dc-87db4a92eae7&orgId=97cdbf45-ebe2-4687-8341-44d5c7abf101'\			
			Calendar cal = Calendar.getInstance();
			long to = cal.getTimeInMillis();
			cal.set(Calendar.HOUR_OF_DAY, -8);
			long from = cal.getTimeInMillis();
			String interval = "15";
			String[] queueIds = new String[] { "11b6ad36-f1b0-41ad-8f80-e893b0d9b118", "4ccbf863-4177-4b92-be0b-d0ba7a38ab45", "595b85db-86f4-473c-acee-cbebb52cc7bc" };
			String queuesIds = Arrays.toString(queueIds).substring(1, Arrays.toString(queueIds).length() - 1);
			System.out.println(queuesIds);
			new QueueStatistics().getQueueStatisticsByFromTo(from, to, interval, queuesIds);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

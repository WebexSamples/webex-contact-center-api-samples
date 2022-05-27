package com.webexcc.api.demo.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

public class EstimatedWaitTime extends ApiService {
	static Logger logger = LoggerFactory.getLogger(EstimatedWaitTime.class);

	public EstimatedWaitTime() {
	}

	void getEstimatedWaitTimeByQueueId(String queueId, String lookbackMinutes, String maxCV, String minValidSamples) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(
					baseURL2 + "/ewt?orgId=" + orginzationId + "&queueId=" + queueId + "&lookbackMinutes=" + lookbackMinutes + "&maxCV=" + maxCV + "&minValidSamples=" + minValidSamples, HttpMethod.GET, entity,
					String.class);

			if (response1.getStatusCode().value() == 204) {
				logger.info("Response 204 NO_CONTENT aka 0 ewt");
				return;
			}
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getEstimatedWaitTimeByQueueId(queueId, lookbackMinutes, maxCV, minValidSamples);
			}
			throw e;
		}
	}

	public static void main(String[] args) {
		try {
			String queueId = "AXaHLXlANNx5c-IB6Fix";
			String lookbackMinutes = "15";
			String maxCV = "40";
			String minValidSamples = "40";
			new EstimatedWaitTime().getEstimatedWaitTimeByQueueId(queueId, lookbackMinutes, maxCV, minValidSamples);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

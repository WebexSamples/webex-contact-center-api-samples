/**
 * Copyright (c) 2022
 * All rights reserved.
 *
 * Permission is hereby granted, free  of charge, to any person obtaining
 * a  copy  of this  software  and  associated  documentation files  (the
 * "Software"), to  deal in  the Software without  restriction, including
 * without limitation  the rights to  use, copy, modify,  merge, publish,
 * distribute,  sublicense, and/or sell  copies of  the Software,  and to
 * permit persons to whom the Software  is furnished to do so.
 *
 * THE  SOFTWARE IS  PROVIDED  "AS  IS", WITHOUT  WARRANTY  OF ANY  KIND,
 * EXPRESS OR  IMPLIED, INCLUDING  BUT NOT LIMITED  TO THE  WARRANTIES OF
 * MERCHANTABILITY,    FITNESS    FOR    A   PARTICULAR    PURPOSE    AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE,  ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
package com.webexcc.api.demo.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

/**
 * The <code>EstimatedWaitTime</code> is a class that implements the rest API to
 * extract data from the WebexCC platform.
 * 
 * @author jiwyatt
 * @since 2.0
 * @see https://developer.webex-cx.com/documentation/estimated-wait-time
 */

public class EstimatedWaitTime extends ApiService {
	static Logger logger = LoggerFactory.getLogger(EstimatedWaitTime.class);

	public EstimatedWaitTime() {
	}

	/**
	 * 
	 * @param queueId
	 * @param lookbackMinutes
	 * @param maxCV
	 * @param minValidSamples
	 * @throws Exception
	 */
	void getEstimatedWaitTimeByQueueId(String queueId, String lookbackMinutes, String maxCV, String minValidSamples) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(
					baseURL2 + "/ewt?orgId=" + organizationId + "&queueId=" + queueId + "&lookbackMinutes=" + lookbackMinutes + "&maxCV=" + maxCV + "&minValidSamples=" + minValidSamples, HttpMethod.GET, entity,
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

	/**
	 * Entry point of the Java <code>EstimatedWaitTime</code> program
	 * 
	 * @param args
	 */

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

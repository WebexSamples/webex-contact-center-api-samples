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

import java.util.Arrays;
import java.util.Calendar;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

/**
 * The <code>QueueStatistics</code> is a class that implements the rest API to
 * extract data from the WebexCC platform.
 * 
 * @author jiwyatt
 * @since 2.0
 * @see https://developer.webex-cx.com/documentation/queues
 */

public class QueueStatistics extends ApiService {
	static Logger logger = LoggerFactory.getLogger(QueueStatistics.class);

	public QueueStatistics() {
	}

	/**
	 * 
	 * @param from
	 * @param to
	 * @param interval
	 * @param queueIds
	 * @throws Exception
	 */
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

	/**
	 * Entry point of the Java <code>QueueStatistics</code> program
	 * 
	 * @param args
	 */

	public static void main(String[] args) {
		try {
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

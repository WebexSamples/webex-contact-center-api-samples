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

import com.fasterxml.jackson.databind.MapperFeature;

/**
 * The <code>EventTypes</code> is a class that implements the rest API to
 * extract data from the WebexCC platform.
 * 
 * @author jiwyatt
 * @since 2.0
 * @see https://developer.webex-cx.com/documentation/entry-point
 */

public class EventTypes extends ApiService {
	static Logger logger = LoggerFactory.getLogger(EventTypes.class);

	public EventTypes() {
	}

	/**
	 * 
	 * @throws Exception
	 */
	void getAllEventTypes() throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL2 + "/event-types?" + "&orgId=" + organizationId + "", HttpMethod.GET, entity, String.class);
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

	/**
	 * Entry point of the Java <code>EventTypes</code> program
	 * 
	 * @param args
	 */

	public static void main(String[] args) {
		try {
			new EventTypes().getAllEventTypes();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

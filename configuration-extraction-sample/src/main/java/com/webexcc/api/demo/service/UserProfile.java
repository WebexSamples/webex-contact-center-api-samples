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

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MapperFeature;
import com.webexcc.api.demo.util.ExportUtil;

/**
 * The <code>UserProfile</code> is a class that implements the userprofile rest
 * API to extract data from the WebexCC platform.
 * 
 * @author jiwyatt
 * @since 2.0
 * @see userprofile
 */

public class UserProfile extends ApiService {
	static Logger logger = LoggerFactory.getLogger(UserProfile.class);

	public UserProfile() {
	}

	/**
	 * 
	 * @param page
	 * @param pageSize
	 * @param list
	 * @throws Exception
	 */
	void getAllUserProfiles(int page, int pageSize, List<com.webexcc.api.demo.model.UserProfile> list) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + organizationId + "/user-profile?page=" + page + "&pageSize=" + pageSize, HttpMethod.GET, entity, String.class);

			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			List<com.webexcc.api.demo.model.UserProfile> o = om.readValue(response1.getBody(), new TypeReference<List<com.webexcc.api.demo.model.UserProfile>>() {
			});
			list.addAll(o);

			if (o.size() < pageSize) {
				return;
			}
			// more data to pull if the array is not empty
			if (!"[]".equals(response1.getBody())) {
				getAllUserProfiles(++page, pageSize, list);
			}
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute. page:{}", page);
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAllUserProfiles(page, pageSize, list);
			}
			throw e;
		}
	}

	/**
	 * 
	 * @param id
	 * @throws Exception
	 */
	void getUserProfileById(String id) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + organizationId + "/user-profile/" + id, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));

			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			com.webexcc.api.demo.model.UserProfile o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.UserProfile.class);
			logger.info("\n{}", o);

		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getUserProfileById(id);
			}
			throw e;
		}
	}

	/**
	 * Entry point of the Java <code>UserProfile</code> program
	 * 
	 * @param args
	 */

	public static void main(String[] args) {
		try {
			List<com.webexcc.api.demo.model.UserProfile> list = new ArrayList<com.webexcc.api.demo.model.UserProfile>();

			// get all
			new UserProfile().getAllUserProfiles(0, 900, list);
			logger.info("list size:{}", list.size());

			// get one
			new UserProfile().getUserProfileById("fce963be-6911-44fe-93ee-1cc47ef367d1");

			// export to CSV
			BufferedWriter writerCsv = new BufferedWriter(new FileWriter("UserProfile.csv"));
			ExportUtil.toCsv(writerCsv, list);
			writerCsv.close();

			// export to JSON
			BufferedWriter writerJson = new BufferedWriter(new FileWriter("UserProfile.json"));
			ExportUtil.toJson(writerJson, list);
			writerJson.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

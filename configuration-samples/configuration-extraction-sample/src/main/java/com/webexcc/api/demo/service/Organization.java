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

import com.webexcc.api.demo.util.ExportUtil;

/**
 * The <code>Organization</code> is a class that implements the rest API to
 * extract data from the WebexCC platform.
 * 
 * @author jiwyatt
 * @since 2.0
 */

public class Organization extends ApiService {
	static Logger logger = LoggerFactory.getLogger(Organization.class);

	public Organization() {
		super();

	}

	/**
	 * 
	 * @param list
	 * @throws Exception
	 */
	void getOrginzation(List<com.webexcc.api.demo.model.Organization> list) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + organizationId, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));
			com.webexcc.api.demo.model.Organization o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.Organization.class);
			logger.info("Orginzation:{}", o);
			list.add(o);
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getOrginzation(list);
			}
			throw e;
		}
	}

	/**
	 * Entry point of the Java <code>Organization</code> program
	 * 
	 * @param args
	 */

	public static void main(String[] args) {
		try {
			List<com.webexcc.api.demo.model.Organization> list = new ArrayList<com.webexcc.api.demo.model.Organization>();

			// get
			new Organization().getOrginzation(list);

			// export to CSV
			BufferedWriter writer = new BufferedWriter(new FileWriter("Organization.csv"));
			ExportUtil.toCsv(writer, list);
			writer.close();

			// export to JSON
			BufferedWriter writerJson = new BufferedWriter(new FileWriter("Organization.json"));
			ExportUtil.toJson(writerJson, list);
			writerJson.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
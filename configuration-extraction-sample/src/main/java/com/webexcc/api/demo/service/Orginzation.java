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

public class Orginzation extends ApiService {
	static Logger logger = LoggerFactory.getLogger(Orginzation.class);

	public Orginzation() {
		super();

	}

	void getOrginzation(List<com.webexcc.api.demo.model.Orginzation> list) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + orginzationId, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));
			com.webexcc.api.demo.model.Orginzation o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.Orginzation.class);
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

	public static void main(String[] args) {
		try {
			List<com.webexcc.api.demo.model.Orginzation> list = new ArrayList<com.webexcc.api.demo.model.Orginzation>();

			// get
			new Orginzation().getOrginzation(list);

			// export to CSV
			BufferedWriter writer = new BufferedWriter(new FileWriter("Orginzation.csv"));
			ExportUtil.toCsv(writer, list);
			writer.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
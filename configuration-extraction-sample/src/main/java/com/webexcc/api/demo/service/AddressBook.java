package com.webexcc.api.demo.service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
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

public class AddressBook extends ApiService {
	static Logger logger = LoggerFactory.getLogger(AddressBook.class);

	public AddressBook() {
	}

	void getAddressBook(int page, int pageSize, List<com.webexcc.api.demo.model.AddressBook> list) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + orginzationId + "/address-book?page=" + page + "&pageSize=" + pageSize, HttpMethod.GET, entity, String.class);
			JSONArray jsonArray = new JSONArray(response1.getBody());
			logger.info("\n{}", jsonArray.toString(4));
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			List<com.webexcc.api.demo.model.AddressBook> o = om.readValue(response1.getBody(), new TypeReference<List<com.webexcc.api.demo.model.AddressBook>>() {
			});
			logger.info("page:{}\tAddressBook:{}", page, o.size());
			list.addAll(o);
			if (!"[]".equals(response1.getBody())) {
				getAddressBook(++page, pageSize, list);
			}
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAddressBook(page, pageSize, list);
			}
			throw e;
		}
	}

	void getAddressBookById(String id) throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + access_token);
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + orginzationId + "/address-book/" + id, HttpMethod.GET, entity, String.class);
			JSONObject json = new JSONObject(response1.getBody());
			logger.info("\n{}", json.toString(4));
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			com.webexcc.api.demo.model.AddressBook o = om.readValue(response1.getBody(), com.webexcc.api.demo.model.AddressBook.class);
			logger.info("AddressBook:{}", o);
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				getAddressBookById(id);
			}
			throw e;
		}
	}

	void toCsv(BufferedWriter writer, List<com.webexcc.api.demo.model.AddressBook> list) throws Exception {
		// header
		writer.append("Id").append(",").append("Name").append(",").append("Name").append(",").append("ParentType").append(",").append("Description").append(",").append("CreatedTime").append(",").append("LastUpdatedTime")
				.append(",").append("AddressBookEntries size" + "").append("\n");
		// data
		list.forEach(o -> {
			try {
				writer.append(o.getId()).append(",").append(o.getName()).append(",").append(o.getParentType()).append(",").append(o.getDescription()).append(",").append(o.getCreatedTime().toString()).append(",")
						.append(o.getLastUpdatedTime().toString()).append(",").append(o.getAddressBookEntries().size() + "").append("\n");
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
	}

	public static void main(String[] args) {
		try {
			// get all
			List<com.webexcc.api.demo.model.AddressBook> list = new ArrayList<com.webexcc.api.demo.model.AddressBook>();
			new AddressBook().getAddressBook(0, 20, list);
			logger.info("list size:{}", list.size());

			// get by id
			new AddressBook().getAddressBookById("12e6ffcd-d241-4768-b567-4f1a65e4998e");

			// export to CSV
			BufferedWriter writer = new BufferedWriter(new FileWriter("AddressBook.csv"));
			ExportUtil.toCsv(writer, list);
			writer.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

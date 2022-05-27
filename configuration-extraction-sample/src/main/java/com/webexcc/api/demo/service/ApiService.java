package com.webexcc.api.demo.service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ApiService {
	RestTemplate restTemplate = new RestTemplate();
	String baseURL = "https://api.wxcc-us1.cisco.com/organization";
	String baseURL2 = "https://api.wxcc-us1.cisco.com/v1/";
	String access_token = "";
	String orginzationId = "";
	ObjectMapper om = new ObjectMapper();

	public ApiService() {
		super();
		// use this when running as a java application
		loadProperties();
		// Autowire the Properties if you plan on using Spring Boot.
	}

	private void loadProperties() {
		try (InputStream input = new FileInputStream("./src/main/resources/application.properties")) {
			Properties prop = new Properties();
			prop.load(input);
			access_token = prop.getProperty("access_token");
			orginzationId = prop.getProperty("orginzationId");
		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

}
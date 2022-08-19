package com.webexcc.api.captures.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webexcc.api.model.AgentsActivities;
import com.webexcc.api.model.Authentication;
import com.webexcc.api.model.Captures;
import com.webexcc.api.model.Organization;

@Service
public class ApiService {
	static Logger logger = LoggerFactory.getLogger(ApiService.class);

	@Autowired
	private RestTemplate restTemplate;
	DateFormat oDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	String baseURL = "https://api.wxcc-us1.cisco.com/organization";// new

	Authentication authentication;

	public ApiService() {
		super();
		new File("data").mkdirs();
		// cache Authentication
		try {
			FileInputStream fi = new FileInputStream(new File("data/Authentication.obj"));
			ObjectInputStream oi = new ObjectInputStream(fi);
			Authentication oAuthentication = (Authentication) oi.readObject();
			setAuthentication(oAuthentication);
		} catch (Exception e) {
			logger.warn("FileInputStream:{}", e.getMessage());
		}
	}

	public Organization getOrginzation() throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(baseURL + "/" + authentication.getOrginzationId(), HttpMethod.GET, entity, String.class);
//			logger.info("getOrginzation:response1.getBody:{}", response1.getBody());
			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			Organization oOrganization = om.readValue(response1.getBody(), Organization.class);
			return oOrganization;
		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
//			return new Organization();
			new File("data/Authentication.obj").delete();
			throw e;
		}
	}

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {

		return restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(10)).setReadTimeout(Duration.ofSeconds(10)).build();
	}

	public Authentication getAuthentication() {
		return authentication;
	}

	public void setAuthentication(Authentication authentication) {
		this.authentication = authentication;
	}

	public AgentsActivities getAgentsActivitiesForAGivenDay(String channelTypes, Calendar c) throws Exception {

		AgentsActivities returnThis = new AgentsActivities();
		try {

			long from = c.getTimeInMillis();
			c.add(Calendar.HOUR, 1);
			long to = c.getTimeInMillis();

			// break the request down by hour, the response does have a limit on the
			// response.
			// assume there are < 1000 records per hour
			for (int i = 0; i < 24; i++) {
//				logger.info("i:{}", i);
				AgentsActivities oAgentsActivities = getAgentsActivitiesByFromTo(channelTypes, from, to);
				if (oAgentsActivities.getData().size() > 0) {
					returnThis.getData().addAll(oAgentsActivities.getData());
				}
//				Thread.sleep(500);
				from = c.getTimeInMillis();
				c.add(Calendar.HOUR, 1);
				to = c.getTimeInMillis();
			}
//			c.add(Calendar.SECOND, -10);
			return returnThis;

		} catch (Exception e) {
//			logger.error("Exception:{}", e.getMessage());

			if (e.getMessage().contains("timestamp should not be more than")) {
				return returnThis;
			}
			logger.error("Exception:{}", e.getMessage());
			throw e;
		}
	}

	private AgentsActivities getAgentsActivitiesByFromTo(String channelTypes, long from, long to) throws Exception {
		String url = "";
		try {

			Calendar c1 = Calendar.getInstance();
			c1.setTimeInMillis(from);
			Calendar c2 = Calendar.getInstance();
			c2.setTimeInMillis(to);
//			logger.info("Calendar.from: {}", c1.getTime());
//			logger.info("Calendar.to  : {}", c2.getTime());
//			logger.info("Calendar  : {} {}", c1.getTime(), c2.getTime());
//			logger.info("");
			// do request
			/**
			 * keep start
			 */
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<String>(payload.toString(), headers);
//		 url = "https://api.wxcc-us1.cisco.com/v1/agents/activities?channelTypes=email" + "&channelTypes=chat" + "&channelTypes=telephony" + "&from=" + from + "&to=" + to + "&pageSize=900" + "&orgId=" + authentication.orginzationId;
			url = "https://api.wxcc-us1.cisco.com/v1/agents/activities?channelTypes=" + channelTypes + "&from=" + from + "&to=" + to + "&pageSize=900" + "&orgId=" + authentication.getOrginzationId();
			ResponseEntity<String> response1 = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
//			logger.info("response1.getBody:{}", response1.getBody());
			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			AgentsActivities oAgentsActivities = om.readValue(response1.getBody(), AgentsActivities.class);
//			logger.info("oAgentsActivities.data.size():{}", oAgentsActivities.data.size());
			return oAgentsActivities;

			/**
			 * keep stop
			 */
//			return new AgentsActivities();

		} catch (Exception e) {
			if (e.getMessage().contains("Too Many Requests")) {
				logger.warn("Too Many Requests... will try again in 60 seconds");
				Thread.sleep(60000);
				return this.getAgentsActivitiesByFromTo(channelTypes, from, to);
			} else {
				logger.error("url:{}", url);
				throw e;
			}
		}
	}

	public Captures capturesQuery() {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			StringBuffer payload = new StringBuffer();

			payload.append("{");
			payload.append("\"query\": {");
			payload.append("	\"orgId\": \"" + authentication.getOrginzationId() + "\",");
			payload.append("	\"urlExpiration\": 30,");
			payload.append("	\"taskIds\": [\"425cc6cf-89f7-4149-9b38-d6305227f4bc\",\"4ccbf863-4177-4b92-be0b-d0ba7a38ab45\",\"595b85db-86f4-473c-acee-cbebb52cc7bc\"],");
			payload.append("	\"includeSegments\": false");
			payload.append("  }");
			payload.append("}");
			HttpEntity<?> entity = new HttpEntity<String>(payload.toString(), headers);
			ResponseEntity<String> response1 = restTemplate.exchange("https://api.wxcc-us1.cisco.com/v1/captures/query" + "", HttpMethod.POST, entity, String.class);
//			logger.info("÷:{}", response1.getBody());
			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

			Captures oCaptures = om.readValue(response1.getBody(), Captures.class);
//			logger.info("oCaptures.data.size():{}", oCaptures.data.size());
			return oCaptures;
		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
//			return new ArrayList<UserProfile>();
		}
		return new Captures();

	}

	public Captures captures(StringBuffer taskIds) throws Exception {
		try {
			StringBuffer payload = new StringBuffer();
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			payload.append("{");
			payload.append("\"query\": {");
			payload.append("	\"orgId\": \"" + authentication.getOrginzationId() + "\",");
			payload.append("	\"urlExpiration\": 30,");
			payload.append("	\"taskIds\": [" + taskIds.toString() + "],");
//			payload.append("	\"taskIds\": [\"425cc6cf-89f7-4149-9b38-d6305227f4bc\",\"4ccbf863-4177-4b92-be0b-d0ba7a38ab45\",\"595b85db-86f4-473c-acee-cbebb52cc7bc\"],");
			payload.append("	\"includeSegments\": false");
			payload.append("  }");
			payload.append("}");
			HttpEntity<?> entity = new HttpEntity<String>(payload.toString(), headers);
			ResponseEntity<String> response1 = restTemplate.exchange("https://api.wxcc-us1.cisco.com/v1/captures/query" + "", HttpMethod.POST, entity, String.class);
//			logger.info("response1.getBody:{}", response1.getBody());
			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

			Captures oCaptures = om.readValue(response1.getBody(), Captures.class);
//			logger.info("oCaptures.data.size():{}", oCaptures.data.size());
			return oCaptures;
		} catch (Exception e) {
			if (e.getMessage().contains("Too Many Requests")) {
				logger.warn("Too Many Requests... will try again in 60 seconds");
				Thread.sleep(60000);
				return this.captures(taskIds);
			} else {
				logger.error("Exception:{}", e.getMessage());
				throw e;
			}
		}

	}

}
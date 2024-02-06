package com.webexcc.api.captures.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import com.webexcc.api.captures.util.SetEnv;
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
	String baseURL = "https://api.wxcc-us1.cisco.com/organization";

	@Value("${data_center_url}")
	String dataCenterURL;

	@Value("${urlExpiration}")
	String urlExpiration;

	Authentication authentication;

	public ApiService() {
		super();
	}

	public Organization getOrginzation() throws Exception {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			HttpEntity<?> entity = new HttpEntity<String>(null, headers);
			ResponseEntity<String> response1 = restTemplate.exchange(dataCenterURL + "/organization/" + authentication.getOrginzationId(), HttpMethod.GET, entity, String.class);

			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			Organization oOrganization = om.readValue(response1.getBody(), Organization.class);
			return oOrganization;
		} catch (Exception e) {
			logger.error("Exception:{}", e.getMessage());
			throw e;
		}
	}


	public Authentication getAuthentication() {
		return authentication;
	}

	public void setAuthentication(Authentication authentication) {
		this.authentication = authentication;
	}

	public AgentsActivities getAgentsActivitiesForAGivenDay(String channelTypes, Calendar c) throws Exception { 
		logger.info("AgentsActivities getAgentsActivitiesForAGivenDay: channelTypes: {} : c.getTime(): {}" , channelTypes, c.getTime().toLocaleString());
		this.avoidThe429Message();

		AgentsActivities returnThis = new AgentsActivities();
		try {

			long from = c.getTimeInMillis();
			c.add(Calendar.HOUR, 1);
			long to = c.getTimeInMillis();

			// break the request down by hour, the response does have a limit on the response.
			// assume there are < 1000 records per hour
			for (int i = 0; i < 24; i++) {
				AgentsActivities oAgentsActivities = getAgentsActivitiesByFromTo(channelTypes, from, to);
				if (oAgentsActivities.getData().size() > 0) {
					returnThis.getData().addAll(oAgentsActivities.getData());
				}
				from = c.getTimeInMillis();
				c.add(Calendar.HOUR, 1);
				to = c.getTimeInMillis();
			}
			return returnThis;

		} catch (Exception e) {
			// this error will only happen if you are searching for today's date
			if (e.getMessage().contains("timestamp should not be more than")) {
				return returnThis;
			}
			logger.error("Exception:{}", e.getMessage());
			throw e;
		}
	}

	/**
	 * https://developer.webex-cx.com/documentation/agents/v1/get-agent-activities
	 */
	private AgentsActivities getAgentsActivitiesByFromTo(String channelTypes, long from, long to) throws Exception { 
		logger.info("AgentsActivities getAgentsActivitiesByFromTo: {} : {} : {}" , channelTypes, from, to);
		this.avoidThe429Message();
		String url = "";
		try {

			Calendar c1 = Calendar.getInstance();
			c1.setTimeInMillis(from);
			Calendar c2 = Calendar.getInstance();
			c2.setTimeInMillis(to);

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			StringBuffer payload = new StringBuffer();
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			url = dataCenterURL + "/v1/agents/activities?channelTypes=" + channelTypes + "&from=" + from + "&to=" + to + "&pageSize=900" + "&orgId=" + authentication.getOrginzationId();
			ResponseEntity<String> response1 = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			AgentsActivities oAgentsActivities = om.readValue(response1.getBody(), AgentsActivities.class);
			return oAgentsActivities;
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


	/**
	 * https://developer.webex-cx.com/documentation/captures
	 */
	public Captures captures(StringBuffer taskIds) throws Exception {
		logger.info("Captures captures:taskIds: {}" , taskIds);
		this.avoidThe429Message();
		try {
			StringBuffer payload = new StringBuffer();
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			payload.append("{");
			payload.append("\"query\": {");
			payload.append("	\"orgId\": \"" + authentication.getOrginzationId() + "\",");
			payload.append("	\"urlExpiration\": " + urlExpiration + ",");
			payload.append("	\"taskIds\": [" + taskIds.toString() + "],");
//	example:payload.append("	\"taskIds\": [\"425cc6cf-89f7-4149-9b38-d6305227f4bc\",\"4ccbf863-4177-4b92-be0b-d0ba7a38ab45\",\"595b85db-86f4-473c-acee-cbebb52cc7bc\"],");
			payload.append("	\"includeSegments\": false");
			payload.append("  }");
			payload.append("}");
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			ResponseEntity<String> response1 = restTemplate.exchange(dataCenterURL + "/v1/captures/query" + "", HttpMethod.POST, entity, String.class);

			ObjectMapper om = new ObjectMapper();
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

			Captures oCaptures = om.readValue(response1.getBody(), Captures.class);

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

	int x = 0;
	private void avoidThe429Message() {
		try {
//			try to avoid the nap... AKA 429 Too Many Requests <- message
			//60000 <- 1 minute/55 <- number of request per minute
			if(x++ > 60) {
				x = 0;
				SetEnv.printJvmMemoryInfo();
			}
			Thread.sleep(60000/55);
		} catch (Exception e1) {
		}
	}

    @Bean
    RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
		return restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(10)).setReadTimeout(Duration.ofSeconds(10)).build();
	}

}
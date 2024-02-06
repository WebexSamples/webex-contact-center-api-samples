package com.webexcc.api.demo.service;

import java.util.List;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.MapperFeature;
import com.webexcc.api.demo.util.MyEnv;

/**
 * The <code>AgentProfile</code> is a class that implements the rest API to
 * extract data from the WebexCC platform.
 *
 * @author jiwyatt
 * @since 2.0
 * @see agent-profile
 */

@Service
public class SearchGraphQLService extends AuthService {
	static Logger logger = LoggerFactory.getLogger(SearchGraphQLService.class);

	public SearchGraphQLService() {
	}

	/**
	 *
	 * @param list
	 * @param pageNumber
	 * @param graphqlString
	 * @throws Exception
	 */
	public void doSearch(List<Object> list, int pageNumber, String graphqlString) throws Exception {
		logger.info("doSearch(list: {}, pageNumber: {}, graphqlString:{}", list.size(), pageNumber, graphqlString);
		this.avoidThe429Message();
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json");
			headers.add("Authorization", "Bearer " + authentication.getAccess_token());
			//fix eol on Windows. .graphql files edited on a Windows machine would not work 
//			logger.info("\ngraphqlString:\n{}", graphqlString);
			graphqlString = graphqlString.replaceAll("\\r|\\n", "");
			StringBuffer payload = new StringBuffer();
			payload.append("{\"query\":\"");
			payload.append(graphqlString);
			payload.append("\"}");
//			payload.append("\",\"variables\":null}");
			HttpEntity<?> entity = new HttpEntity<>(payload.toString(), headers);
			String url = dataCenterURL + "/search?orgId=" + authentication.getOrginzationId();
			
			logger.debug("\npayload.toString():\n{}", payload.toString());
//			logger.debug("url:{}", url);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
			JSONObject json = new JSONObject(response.getBody());
			logger.debug("response:\n{}", json.toString(4));
			om.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
			com.webexcc.api.demo.model.Root o = om.readValue(response.getBody(), com.webexcc.api.demo.model.Root.class);
			
			try {
				list.addAll(o.getData().getTask().getTasks());
			} catch (Exception e1) {
				list.addAll(o.getData().getTaskDetails().getTasks());
			}
			try {
				if (json.getJSONObject("data").getJSONObject("task").getJSONObject("pageInfo").getBoolean("hasNextPage")) {
					logger.info("Processing page: {} collected records: {}", pageNumber, list.size());
					int currentPage = pageNumber;
					pageNumber++;
					graphqlString = graphqlString.replaceAll("pagination: \\{cursor:\\\\\"" + currentPage + "\\\\\"}", "pagination: {cursor:\\\\\"" + (pageNumber) + "\\\\\"}");
					doSearch(list, pageNumber, graphqlString);
				} else {
					logger.info("NO MORE DATA; done with pagination");
				}
			} catch (Exception e) {
				logger.info("NO MORE DATA on this page");
			}
		} //
		catch (java.lang.NullPointerException e) {
			logger.warn("NullPointerException", e);
		} catch (Exception e) {
			if (e.getMessage().startsWith("429 Too Many Requests")) {
				logger.info("MORE DATA on page: {} collected records: {}", pageNumber, list.size());
				logger.warn("Too Many Requests so take a nap for 1 minute.");
				try {
					Thread.sleep(60000);
				} catch (InterruptedException e1) {
				}
				doSearch(list, pageNumber, graphqlString);
			}
			throw e;
		}
	}
	
	int x = 0;
	private void avoidThe429Message() {
		try {
//			try to avoid the nap... AKA 429 Too Many Requests <- message
			//60000 <- 1 minute/55 <- number of request per minute
			if(x++ > 60) {
				x = 0;
				MyEnv.printJvmMemoryInfo();
			}
			Thread.sleep(60000/60);
		} catch (Exception e1) {
		}
	}
	

}

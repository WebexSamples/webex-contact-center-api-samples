package com.webexcc.api.demo.controller;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
//import org.apache.commons.lang3.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.webexcc.api.demo.service.AuthService;
import com.webexcc.api.demo.service.SearchGraphQLService;
import com.webexcc.api.demo.util.ExportUtil;
import com.webexcc.api.demo.util.ScheduledTasks;

@RestController
@CrossOrigin

/**
 * force all traffic to /
 */
@RequestMapping("/")
public class WebRestController {
	static Logger logger = LoggerFactory.getLogger(WebRestController.class);
	ConcurrentHashMap<String, String> validQueries = new ConcurrentHashMap<>();

	@Autowired
	AuthService authService;

	@Autowired
	ScheduledTasks scheduledTasks;

	@Autowired
	SearchGraphQLService searchGraphQL;

	public WebRestController() {
		super();
	}

	/**
	 * this method is where all of the magic happens with authentication
	 * 
	 * @param request
	 * @param response
	 */
	@GetMapping("/")
	public Object root(HttpServletRequest request, HttpServletResponse response, @RequestParam final Map<String, String> inboundParameters) {
		logger.info("inboundParameters:{}", inboundParameters);
		try {
			java.util.LinkedHashMap<?, ?> map = (java.util.LinkedHashMap<?, ?>) inboundParameters;
			try {
				/**
				 * STEP 3 - already logged in STEP 2 only if authorized STEP 1 only if it is the
				 * 1st time to the web page
				 */
				//

				// STEP 3
				if (authService.getAuthentication() != null) {
					if (authService.getAuthentication().getAccess_token() == null) {
						throw new Exception("Need to login");
					}
					logger.info("Logged in");
					return homePage(request, response);
				}

				/**
				 * STEP 2 - get the token after the authorize request in STEP 1 below
				 */
				logger.info("authorized but not logged in");
				// this will cause an exception if code is not set. THIS IS A GOOD THING
				try {
					map.get("code").toString();
				} catch (Exception e) {
					throw new Exception("need to login");
				}
				authService.accessToken(map);
				scheduledTasks.setApiService(authService);
				searchGraphQL.setAuthentication(authService.getAuthentication());

				return homePage(request, response);
			}

			catch (java.lang.NullPointerException e) {
				authService.setAuthentication(null);
				return "Clear cache and try again.";
			} catch (com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException e) {
				logger.error("UnrecognizedPropertyException", e);
				return "{\"Exception\":\"" + e.getOriginalMessage() + "\"}";
			} catch (Exception e) {
				/**
				 * STEP 1 - make the authorize request
				 */
				logger.info("1st time to web site");
				String login = authService.authorize();
				response.sendRedirect(login);
			}
		} catch (Exception e) {
			return "{\"Exception\":\"" + e.getMessage() + "\"}";
		}

		return "{}";
	}

	/**
	 * endpoint == /homePage
	 * 
	 * @return html
	 */
	@GetMapping("/homePage")
	@ResponseBody
	public Object homePage(HttpServletRequest request, HttpServletResponse response) {
		if (authService.getAuthentication() == null) {
			return root(request, response, null);
		}

		// load all of the queries so we can dynamically build the menu
		checkRequest("");

		StringBuffer sb = new StringBuffer();
		// @formatter:off
		sb.append("<!DOCTYPE html>")
		.append("<html>")
		.append("<body>")
		.append("<h1>graphql-sample-java</h1>")
		.append("<p>https://developer.webex-cx.com/documentation/search/v1/search-tasks</p>")
		.append("<a href=\"reset\">Load new search queries</a>").append("</p>");
				
		// sort and print ../graphql/*.graphql
		validQueries.entrySet().stream().sorted(Map.Entry.comparingByValue()).forEach(entry -> {
			sb.append("<a href=\""+entry.getKey()+"\">"+entry.getKey()+"</a>").append("</br>");
		});
		sb.append("</body>");
		sb.append("</html>	");
		// @formatter:on
		return sb.toString();
	}

	/**
	 * all queries will go here ... dynamic endpoint
	 * 
	 * @param endpointName
	 * @return
	 */
	@GetMapping("/{endpointName}")
	@ResponseBody
	public Object endpointName(HttpServletRequest request, HttpServletResponse response, @PathVariable String endpointName) {
		try {
			if ("reset".equalsIgnoreCase(endpointName)) {
				validQueries.clear();
				return homePage(request, response);
			}
			boolean isValidRequest = checkRequest(endpointName);
			if (!isValidRequest) {
				return "{\"Exception\":\"Not a valid request\"}";
			}
			if (authService.getAuthentication() == null) {
				return root(request, response, null);
			}

			List<Object> list = new ArrayList<>();
			String graphqlString = loadQueryFromFile(endpointName);

			searchGraphQL.doSearch(list, 0, graphqlString);
			String s = ExportUtil.toCsv(list);
			return s;
		} 
		catch (com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException e) {
			logger.error("UnrecognizedPropertyException", e);
			return "{\"Exception\":\"" + e.getOriginalMessage() + "\"}";			
		}
		catch (Exception e) {
			logger.error("Exception", e);

			return "{\"Exception\" : \"" + e.getMessage() + "\"}";
		}
	}

	/**
	 * restrict endpoint to only valid graphql searches
	 * 
	 * @param endpointName
	 * @return
	 */
	private boolean checkRequest(String endpointName) {
		if (validQueries.size() == 0) {
			String[] files = new File("./graphql/").list(new FilenameFilter() {
				@Override
				public boolean accept(File dir, String name) {
					if (name.toLowerCase().endsWith(".graphql")) {
						return true;
					}
					return false;
				}
			});
			for (String file : files) {
				String baseName = FilenameUtils.getBaseName(file);
				validQueries.put(baseName, file);
			}
		}
		if (validQueries.get(endpointName) != null) {
			return true;
		}
		return false;
	}

	/**
	 * load query from flat file
	 * 
	 * @param fileToLoad
	 * @return
	 * @throws IOException
	 */

	private String loadQueryFromFile(String fileToLoad) throws IOException {
		Path fileName = Path.of("");
		fileName = Path.of("./graphql/" + fileToLoad + ".graphql");
		// read the file
		String graphqlString = Files.readString(fileName);
		
		graphqlString = graphqlString.replaceAll("\n", "\\\\n");
		graphqlString = graphqlString.replaceAll("\"", "\\\\\"");

		Calendar cal = Calendar.getInstance();
		long to = cal.getTimeInMillis();
		cal.set(Calendar.DAY_OF_MONTH, -30);
		long from = cal.getTimeInMillis();
		logger.info("from:{}", new Date(from));
		logger.info("to  :{}", new Date(to));
		

		graphqlString = graphqlString.replaceAll("\\{from}", "" + from);
		graphqlString = graphqlString.replaceAll("\\{to}", "" + to);
//		logger.info("graphqlString:\n{}", graphqlString);
		
		return graphqlString;
	}

}
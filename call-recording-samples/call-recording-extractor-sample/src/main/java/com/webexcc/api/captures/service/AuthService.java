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
package com.webexcc.api.captures.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webexcc.api.model.Authentication;

/**
 * The <code>ApiService</code> is a base class that the API classes will extend.
 *
 * @author jiwyatt
 * @since 2.0
 */

@Service
@Primary
public class AuthService {
	static Logger logger = LoggerFactory.getLogger(AuthService.class);

	private static String getDurationBreakdown(long millis) {
		logger.info("refreshToken: getDurationBreakdown: millis: {}", millis);
		if (millis < 0) {
			throw new IllegalArgumentException("Duration must be greater than zero!");
		}

		long days = TimeUnit.MILLISECONDS.toDays(millis);
		millis -= TimeUnit.DAYS.toMillis(days);
		long hours = TimeUnit.MILLISECONDS.toHours(millis);
		millis -= TimeUnit.HOURS.toMillis(hours);
		long minutes = TimeUnit.MILLISECONDS.toMinutes(millis);
		millis -= TimeUnit.MINUTES.toMillis(minutes);
		long seconds = TimeUnit.MILLISECONDS.toSeconds(millis);

		StringBuilder sb = new StringBuilder(64);
		sb.append(" Days: ");
		sb.append(days);
		sb.append(" Hours: ");
		sb.append(hours);
		sb.append(" Minutes: ");
		sb.append(minutes);
		sb.append(" Seconds:");
		sb.append(seconds);
		logger.info("refreshToken: getDurationBreakdown: TimeUnit: {}", sb);

		return (sb.toString());
	}

	RestTemplate restTemplate = new RestTemplate();

	/**
	 * login URL
	 */
	String webexapisURL = "https://webexapis.com/v1";// new


	@Value("${data_center_url}")
	String dataCenterURL;

	/**
	 * @see https://developer.webex-cx.com/documentation/authentication
	 *
	 *      these valuse are stored in src/main/resources/application.properties
	 */
	@Value("${response_type}")
	private String response_type;
	@Value("${client_id}")
	private String client_id;
	@Value("${redirect_uri}")
	private String redirect_uri;
	@Value("${scope}")
	private String scope;
	@Value("${state}")
	private String state;
	@Value("${grant_type}")
	private String grant_type;

	@Value("${client_secret}")
	private String client_secret;

	/**
	 * transformer class
	 */
	ObjectMapper om = new ObjectMapper();

	Authentication authentication;

	public AuthService() {
		super();
	}

	public String authorize() {
		String redirectUriEncode = URLEncoder.encode(redirect_uri, StandardCharsets.US_ASCII);
		String scopeEncode = URLEncoder.encode(scope, StandardCharsets.US_ASCII);
		String login = webexapisURL + "/authorize?response_type=" + response_type + "&client_id=" + client_id + "&redirect_uri=" + redirectUriEncode + "&scope=" + scopeEncode + "&state=" + state;
		logger.info("login:{}", login);
		return login;
	}

	public Authentication accessToken(java.util.LinkedHashMap<?, ?> map) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", grant_type);
		params.add("client_id", client_id);
		params.add("client_secret", client_secret);
		params.add("code", map.get("code").toString());
		params.add("redirect_uri", redirect_uri);

		HttpEntity<MultiValueMap<String, String>> request2 = new HttpEntity<>(params, headers);

		ResponseEntity<String> response2 = new RestTemplate().postForEntity(webexapisURL + "/access_token", request2, String.class);
		logger.info("response2: {}", response2.getBody());

		ObjectMapper om = new ObjectMapper();
		Authentication oAuthentication;
		oAuthentication = om.readValue(response2.getBody(), Authentication.class);
		oAuthentication.setCode(map.get("code").toString());
		String[] t = oAuthentication.getAccess_token().split("_");

		String orginzationId = t[t.length - 1];
		oAuthentication.setOrginzationId(orginzationId);
		setAuthentication(oAuthentication);
		logger.info("oAuthentication:{}", oAuthentication);

		return oAuthentication;
	}

	public Authentication refreshToken() throws Exception {
		logger.info("refreshToken:");
		logger.info("authentication:before:{}", authentication);

		long delta = System.currentTimeMillis() - authentication.getLoginTimestamp();
		getDurationBreakdown(delta);
		logger.info("refreshToken:renew");
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "refresh_token");
		params.add("client_id", client_id);
		params.add("client_secret", client_secret);
		params.add("refresh_token", getAuthentication().getRefresh_token());

		HttpEntity<MultiValueMap<String, String>> request2 = new HttpEntity<>(params, headers);
		//
		ResponseEntity<String> response2 = null;
		try {
			response2 = new RestTemplate().postForEntity(webexapisURL + "/access_token", request2, String.class);
		} catch (RestClientException e) {
			logger.error("Exception", e);
		}
		logger.info("response2: {}", response2.getBody());

		ObjectMapper om = new ObjectMapper();
		Authentication oAuthentication;
		oAuthentication = om.readValue(response2.getBody(), Authentication.class);
		String[] t = oAuthentication.getAccess_token().split("_");

		String orginzationId = t[t.length - 1];
		oAuthentication.setOrginzationId(orginzationId);
		setAuthentication(oAuthentication);
		logger.info("authentication:after:{}", authentication);
		return oAuthentication;
	}

	public void setAuthentication(Authentication authentication) {
		this.authentication = authentication;
	}

	public Authentication getAuthentication() {
		return authentication;
	}

	@Override
	public String toString() {
		// @formatter:off
		return "ApiService ["
				+ "\ndataCenterURL=" + dataCenterURL
				+ "\nauthentication=" + authentication 
				+ "]";
		// @formatter:on
	}

}
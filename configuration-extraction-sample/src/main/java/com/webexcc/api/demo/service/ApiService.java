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

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * The <code>ApiService</code> is a base class that the API classes will extend.
 * 
 * @author jiwyatt
 * @since 2.0
 */

public class ApiService {
	RestTemplate restTemplate = new RestTemplate();
	/**
	 * Configuration data API URL
	 */
	String baseURL = "https://api.wxcc-us1.cisco.com/organization";

	/**
	 * Reporting data API URL
	 */
	String baseURL2 = "https://api.wxcc-us1.cisco.com/v1/";

	/**
	 * @see https://developer.webex-cx.com/documentation/authentication
	 */
	String access_token = "";

	/**
	 * tenant ID
	 */
	String organizationId = "";

	/**
	 * transformer class
	 */
	ObjectMapper om = new ObjectMapper();

	public ApiService() {
		super();
		// use this when running as a java application
		loadProperties();
		// Autowire the Properties if you plan on using Spring Boot.
	}

	/**
	 * load WebexCC tenant information from a property file
	 */
	private void loadProperties() {
		try (InputStream input = new FileInputStream("./src/main/resources/application.properties")) {
			Properties prop = new Properties();
			prop.load(input);
			access_token = prop.getProperty("access_token");
			organizationId = prop.getProperty("organizationId");
		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

}
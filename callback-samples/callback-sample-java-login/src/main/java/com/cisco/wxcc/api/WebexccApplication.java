package com.cisco.wxcc.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;




@SpringBootApplication
@ComponentScan(basePackages = "com")
public class WebexccApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebexccApplication.class, args);
	}

}


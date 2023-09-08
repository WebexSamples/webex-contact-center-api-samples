package com.cisco.wxcc.api.util;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ObjectLogger {

	public static void log(String name, Object obj) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			log.info("{}: {}", name, objectMapper.writeValueAsString(obj));
		} catch (JsonProcessingException e) {
		}
	}
}

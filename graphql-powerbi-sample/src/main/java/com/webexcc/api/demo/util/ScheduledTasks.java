package com.webexcc.api.demo.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.webexcc.api.demo.service.AuthService;

@Component
public class ScheduledTasks {

	static Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	private AuthService apiService;

	public AuthService getApiService() {
		return apiService;
	}

	@Scheduled(fixedRate = 1000 * 60 * 10)
	public void refreshToken() {
		logger.info("The time is now {}", dateFormat.format(new Date()));
		if (apiService != null) {
			try {
				apiService.refreshToken();
			} catch (Exception e) {
				logger.error("Exception:", e);
			}
		}
	}

	public void setApiService(AuthService apiService) {
		this.apiService = apiService;
	}
}
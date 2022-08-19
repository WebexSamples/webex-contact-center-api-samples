package com.webexcc.api.captures.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class ScheduledTasks {

	static Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	private AuthService authService;

	public AuthService getAuthService() {
		return authService;
	}

	@Scheduled(fixedRate = 1000 * 60 * 10)
	public void refreshToken() {
		logger.info("The time is now {}", dateFormat.format(new Date()));
		if (authService != null) {
			try {
				authService.refreshToken();
			} catch (Exception e) {
				logger.error("Exception:", e);
			}
		}
	}

	public void setAuthService(AuthService apiService) {
		this.authService = apiService;
	}
}
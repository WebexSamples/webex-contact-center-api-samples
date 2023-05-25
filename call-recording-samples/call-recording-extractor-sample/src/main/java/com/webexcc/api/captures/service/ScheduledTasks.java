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

	//             milliseconds * seconds * minutes * hours
	@Scheduled(fixedRate = 1000 * 60 * 60 * 24)
	public void refreshToken() {
		logger.info("The time is now {}", dateFormat.format(new Date()));
		if (authService != null) {
			try {
				// SECURITY RISK
				// SECURITY RISK
				// only do this is this to be ran as an internal service and to keep the user logged in forever.
				// SECURITY RISK
				// SECURITY RISK
//				authService.refreshToken(); 
			} catch (Exception e) {
				logger.error("Exception:", e);
			}
		}
	}

	public void setAuthService(AuthService apiService) {
		this.authService = apiService;
	}
}
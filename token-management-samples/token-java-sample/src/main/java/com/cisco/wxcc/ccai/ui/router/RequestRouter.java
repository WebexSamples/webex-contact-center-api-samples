package com.cisco.wxcc.ccai.ui.router;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerResponse;

import com.cisco.wxcc.ccai.ui.model.UserInfo;
import com.cisco.wxcc.ccai.ui.util.Decoder;

import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;

@Configuration
@Slf4j
public class RequestRouter {

	Logger logger = LoggerFactory.getLogger(RequestRouter.class);

	@Value("${spring.security.oauth2.client.registration.webexcc.login-success-uri}")
	private String loginSuccessUri;
	

	@Value("${spring.security.oauth2.client.registration.webexcc.logout-success-uri}")
	private String logoutSuccessUri;

	@Bean
	RouterFunction<ServerResponse> routes(OAuth2AuthorizedClientService clientService) {
		return RouterFunctions.route()
				.GET("/userinfo", req -> {
					log.debug("User info request: {}", req);
					return ServerResponse.ok().body(userInfo(clientService));
				})
				.build();

	}

	private UserInfo userInfo(OAuth2AuthorizedClientService clientService) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) auth;
		OAuth2AuthorizedClient client = clientService.loadAuthorizedClient( token.getAuthorizedClientRegistrationId(), token.getName());
		
		System.out.println("token.getPrincipal().getAttribute(\"orgId\").toString():" + Decoder.decodeOrgId(token.getPrincipal().getAttribute("orgId").toString()));
		UserInfo info = UserInfo.builder().build();
		try {
			info = UserInfo.builder()
					.userId(Decoder.decodeOrgId(token.getPrincipal().getAttribute("id").toString()))
					.userName(token.getPrincipal().getAttribute("userName").toString())
					.displayName(token.getPrincipal().getAttribute("displayName").toString())
					.orgId(Decoder.decodeOrgId(token.getPrincipal().getAttribute("orgId").toString()))
					.accessToken("Bearer " + client.getAccessToken().getTokenValue())
					.logoutUrl(logoutSuccessUri)
					.build();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return info;
	}
}

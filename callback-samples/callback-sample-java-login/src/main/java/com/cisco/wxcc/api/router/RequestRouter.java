package com.cisco.wxcc.api.router;

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

import com.cisco.wxcc.api.model.UserInfo;
import com.cisco.wxcc.api.util.Decoder;

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
				.GET("/outdial", req -> {
					log.debug("outdial request: {}", req);
					return makeOutdialCall(clientService);
				})
				.GET("/execute_flow", req -> {
					log.debug("outdial request: {}", req);
					return makeExecuteFlowCall(clientService);
				})
				.build();

	}

	@SuppressWarnings("deprecation")
	private ServerResponse makeExecuteFlowCall(OAuth2AuthorizedClientService clientService) {
		try {
			
			OkHttpClient client = new OkHttpClient().newBuilder()
					  .build();
					MediaType mediaType = MediaType.parse("application/json");
					okhttp3.RequestBody body2 = okhttp3.RequestBody.create(mediaType, "{"
							+ "  \"destination\": \"1##########\"," // the number you are calling
							+ "  \"entryPointId\": \"495ba730-ec20-4e17-8aae-365a12f9337a\"," //Entry Points
							+ "  \"outboundType\": \"EXECUTE_FLOW\","
							+ "  \"mediaType\": \"telephony\","
							+ "  \"attributes\": {\"agentEmail\":\"jiwyatt_ps@email.carehybrid.com\"},"
							+ "  \"origin\": \"+14806754092\"" //Outdial ANI
							+ "}");
					okhttp3.Request request2 = new Request.Builder()
					  .url("https://api.wxcc-us1.cisco.com/v1/tasks")
					  .method("POST", body2)
					  .addHeader("Accept", "application/json")
					  .addHeader("Authorization", userInfo(clientService).getAccessToken())
					  .addHeader("Content-Type", "application/json")
					  .build();
					okhttp3.Response response2 = client.newCall(request2).execute();
			return ServerResponse.ok().body(response2.body().string());
		} catch (Exception e) {
			logger.error("Exception:{}", e);
			return ServerResponse.ok().body(e.toString());
		}
	}

	@SuppressWarnings("deprecation")
	private ServerResponse makeOutdialCall(OAuth2AuthorizedClientService clientService) {
		try {
			
			OkHttpClient client = new OkHttpClient().newBuilder()
					  .build();
					MediaType mediaType = MediaType.parse("application/json");
					okhttp3.RequestBody body2 = okhttp3.RequestBody.create(mediaType, "{"
							+ "  \"destination\": \"1##########\"," // the number you are calling
							+ "  \"entryPointId\": \"57a9b978-206f-48bd-a340-770b61ca83c4\"," //Outdial Entry Points
							+ "  \"outboundType\": \"OUTDIAL\","
							+ "  \"mediaType\": \"telephony\","
							+ "  \"origin\": \"+14806754092\"" //Outdial ANI
							+ "}");
					okhttp3.Request request2 = new Request.Builder()
					  .url("https://api.wxcc-us1.cisco.com/v1/tasks")
					  .method("POST", body2)
					  .addHeader("Accept", "application/json")
					  .addHeader("Authorization", userInfo(clientService).getAccessToken())
					  .addHeader("Content-Type", "application/json")
					  .build();
					okhttp3.Response response2 = client.newCall(request2).execute();
			return ServerResponse.ok().body(response2.body().string());
		} catch (Exception e) {
			logger.error("Exception:{}", e);
			return ServerResponse.ok().body(e.toString());
		}
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

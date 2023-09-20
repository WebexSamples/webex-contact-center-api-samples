package com.cisco.wxcc.ccai.ui.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.RequestEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequestEntityConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.MultiValueMap;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@Slf4j
public class OAuth2SecurityConfig {

	@Value("${spring.security.oauth2.client.registration.webexcc.login-success-uri}")
	private String loginSuccessUri;

	@Value("${spring.security.oauth2.client.registration.webexcc.logout-success-uri}")
	private String logoutSuccessUri;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests()
			.requestMatchers("/public/*").permitAll()
			.requestMatchers("/ui/css/*").permitAll()
			.requestMatchers("/ui/images/*").permitAll()
			.anyRequest()
			.hasAnyAuthority("SCOPE_cjp:config",
					"SCOPE_cjp:config_read",
					"SCOPE_cjp:config_write",
					"SCOPE_cjp:user",
					"SCOPE_spark:people_read")
			.and()
			.oauth2Login()
			.tokenEndpoint()
			.accessTokenResponseClient(accessTokenResponseClient())
			.and()
			.defaultSuccessUrl(loginSuccessUri, true)
			.and()
			.logout(logout -> logout
					.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
					.deleteCookies("JSESSIONID")
					.invalidateHttpSession(false)
					.logoutSuccessUrl(logoutSuccessUri)
					.permitAll());

		return http.build();
	}

	@Bean
    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {
        DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient = new DefaultAuthorizationCodeTokenResponseClient();
        accessTokenResponseClient.setRequestEntityConverter(new CustomRequestEntityConverter());

        return accessTokenResponseClient;
    }

	private class CustomRequestEntityConverter implements Converter<OAuth2AuthorizationCodeGrantRequest, RequestEntity<?>> {
		private OAuth2AuthorizationCodeGrantRequestEntityConverter converter;

	    public CustomRequestEntityConverter() {
	        converter = new OAuth2AuthorizationCodeGrantRequestEntityConverter();
	    }

	    @SuppressWarnings("unchecked")
		@Override
	    public RequestEntity<?> convert(OAuth2AuthorizationCodeGrantRequest req) {
	    	try {

		        RequestEntity<?> entity = converter.convert(req);
		        MultiValueMap<String, String> params = (MultiValueMap<String,String>) entity.getBody();
		        
		        params.add("self_contained_token", "true");

		        return new RequestEntity<>(params, entity.getHeaders(), entity.getMethod(), entity.getUrl());
	    	} catch(Exception e) {
	    		e.printStackTrace();
	    	}
	    	
	    	return null;
	    }
	}

}

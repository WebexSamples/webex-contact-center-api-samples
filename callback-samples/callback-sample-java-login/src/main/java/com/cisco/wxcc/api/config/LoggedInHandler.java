package com.cisco.wxcc.api.config;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class LoggedInHandler extends SimpleUrlAuthenticationSuccessHandler
  implements AuthenticationSuccessHandler {

    public LoggedInHandler() {
        super();
        setUseReferer(true);
    }

}
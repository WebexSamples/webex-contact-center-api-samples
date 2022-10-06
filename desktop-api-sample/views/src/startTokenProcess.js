const success = document.querySelector("#start");

// build Authentication URL
async function endPointEvent() {
  // STEP3 = replace with your credentials
  const redirectURL = `your_public_url/oauth/redirect`;
  const client_id = `your_client_id`;

  const endPoint = new URL(`https://webexapis.com/v1/authorize`);
  endPoint.search = new URLSearchParams({
    client_id: client_id,
    response_type: "code",
    redirect_uri: redirectURL,
    scope: "cjp:user cjp:config_write cjp:config cjp:config_read",
    state: "desktopAPIs"
  });

  return endPoint;
}
success.innerHTML = `<a class="auth" href=${await endPointEvent()}>Start</a> `;

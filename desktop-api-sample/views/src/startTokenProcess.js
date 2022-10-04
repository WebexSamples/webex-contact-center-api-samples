const success = document.querySelector("#start");

// build Authentication URL
async function endPointEvent() {
  //replace with your credentials
  const redirectURL = `https://bf8e-2600-1700-8490-795f-e993-8c2e-f4a9-8d32.ngrok.io/oauth/redirect`;
  // const redirectURL = `https://sa-wxcc-api-custom-desktop.herokuapp.com/oauth/redirect`;
  const client_id = `Cdd4cb4f0ab6f636a0ae231dee18ef1a2dbec2fe67427125dff438809ac3f2142`;

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

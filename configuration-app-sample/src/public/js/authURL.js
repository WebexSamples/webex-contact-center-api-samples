//build auth URL
const div = document.querySelector("#mainArticle");
const authBtn = document.createElement("a");
authBtn.classList.add("btn");
authBtn.textContent = "WxCC oAuth";
authBtn.href = "https://webexapis.com/v1/authorize?client_id=C239e8b22acfb54145054c7626e1cdf3fe6b6c8d2a80562c0edfcc2f7e8e27889&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth%2Fredirect&scope=cjp%3Aconfig_write%20cjp%3Aconfig%20cjp%3Aconfig_read&state=set_state_here";
div.appendChild(authBtn);

console.log(div);

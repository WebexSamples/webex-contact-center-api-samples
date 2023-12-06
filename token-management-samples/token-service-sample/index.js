const admin = require("firebase-admin");
admin.initializeApp();

exports.tokenService = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  // handle preflight requests here
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept, x-token-passphrase");
    return res.status(204).send('');
  }

  // callback request
  if (req.path === "/callback") {
    const code = req.query.code ? req.query.code : null;
    if (!code) {
      return res.status(500).json({ status: "500", message: `An error occured: ${req.query.error}` });
    }
    if (req.query.state === "set_state_here") {
      return res.status(500).json({ status: "500", message: `Set state to your Token Name` });
    }
    try {
      const tokenName = req.query.state;
      const tokenDoc = await admin.firestore().collection("tokens").doc(tokenName).get();
      const tokenData = tokenDoc.data();
      const payload = {
        grant_type: "authorization_code",
        client_id: tokenData.clientId,
        client_secret: tokenData.clientSecret,
        redirect_uri: tokenData.redirectUri,
        code: code,
      };
      const urlParams = Object.entries(payload).map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`).join("&");

      const url = "https://webexapis.com/v1/access_token";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: urlParams,
      };

      const fetchRes = await fetch(url, options);
      const responseData = await fetchRes.json();
      const timeNow = Date.now();

      await admin.firestore().collection("tokens").doc(tokenName).set({
        accessExpires: timeNow + (responseData.expires_in * 1000),
        refreshExpires: timeNow + (responseData.refresh_token_expires_in * 1000),
        accessToken: responseData.access_token,
        refreshToken: responseData.refresh_token,
        lastRefresh: timeNow,
      }, { merge: true });

      return res.status(200).json({ status: "200", message: "Access & Refresh tokens created" });
    } catch (error) {
      console.error(`Failure in /auth/callback request, error: ${error}`)
      return res.status(500).json({ status: "500", message: `Failed to create tokens, error: ${error}` });
    }
  }


  // Validate query param name exists
  const tokenName = req.query.name;
  if (!tokenName) return res.status(500).json({ status: "500", message: "Missing Token Name" });

  // Validate header x-token-passphrase exists
  const tokenPassphrase = req.headers["x-token-passphrase"];
  if (!tokenPassphrase) return res.status(500).json({ status: "500", message: "Missing Passphrase" });

  // Validate x-token-passphrase matches stored secret key
  const TOKEN_PASSPHRASE = process.env.TOKEN_PASSPHRASE;
  if (TOKEN_PASSPHRASE != tokenPassphrase) return res.status(500).json({ status: "500", message: "Invalid Token Passphrase" });


  // init request
  if (req.path === "/init") {
    try {
      await admin.firestore().collection("tokens").doc(tokenName).set({
        clientId: "",
        clientSecret: "",
        redirectUri: "",
      }, { merge: true });
      return res.status(200).json({ status: "200", message: "Token document initialized" });
    } catch (error) {
      console.error(`Failure in /init request, error: ${error}`)
      return res.status(500).json({ status: "500", message: `Failed to initialize token document, error: ${error}` });
    }
  }


  // main request
  try {
    const tokenDoc = await admin.firestore().collection("tokens").doc(tokenName).get();
    const tokenData = tokenDoc.data();
    const currentTime = Date.now();

    // Check if access token has at least two hour remaining
    if (tokenData.accessExpires > currentTime + (2 * 60 * 60 * 1000)) {
      // Access Token Valid, return Access Token
      return res.status(200).json({ status: "200", token: tokenData.accessToken });

      // Check if Refresh Token has at least to minutes remaining
    } else if (tokenData.refreshExpires > currentTime + (2 * 60 * 1000)) {
      // Access Token expired, refreshing Access Token
      try {
        const payload = {
          grant_type: "refresh_token",
          client_id: tokenData.clientId,
          client_secret: tokenData.clientSecret,
          refresh_token: tokenData.refreshToken,
        };

        const urlParams = Object.entries(payload).map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`).join("&");

        const url = "https://webexapis.com/v1/access_token";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
          },
          body: urlParams,
        };

        const fetchRes = await fetch(url, options);
        const responseData = await fetchRes.json();
        const timeNow = Date.now();

        await admin.firestore().collection("tokens").doc(tokenName).set({
          accessExpires: timeNow + (responseData.expires_in * 1000),
          refreshExpires: timeNow + (responseData.refresh_token_expires_in * 1000),
          accessToken: responseData.access_token,
          refreshToken: responseData.refresh_token,
          lastRefresh: timeNow,
        }, { merge: true });

        return res.status(200).json({ status: "200", token: responseData.access_token });
      } catch (error) {
        console.error(`Token Refresh Failed, Error: ${error}`)
        console.error(`Try reseting the service by browsing the the OAuth Authorization URL.`)
        return res.status(500).json({ status: "500", message: "Token refresh failed" });
      }

      // Refresh Token has expired
    } else {
      console.error("Refresh Token expired, you need to browse the the OAuth Authorization URL.")
      return res.status(500).json({ status: "500", message: "Refresh Token expired" });
    }

  } catch (error) {
    // Access Token not found
    console.error(`Invalid Access Token name: ${tokenName}. Error: ${error}`)
    return res.status(500).json({ status: "500", message: "Access Token not found" });
  }
};

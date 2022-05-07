//Express Configuration
import express from "express";
import axios from "axios";
import cors from "cors";
import localtunnel from "localtunnel";

// Localtunnel Wrapper used for Local dev testing on APIs that need public HTTPS access...
(async () => {
  const tunnel = await localtunnel({
    port: 5000,
    // Give a unique subdomain. Or you can delete this object to get a random assigned
    subdomain: "examplecallback1"
  });

  // The assigned public url for your tunnel  i.e. https://abcdefgjhij.localtunnel.me
  let url = tunnel.url;
  console.log(url); // copy the URL and add to to your POST / WebHook, etc...

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();

const app = express();

//Cors Configuration
app.use(cors());

//help read form values - native express option
// app.use(express.urlencoded());
app.use(express.json());

//Express Router Configuration
const router = express.Router();

//Test API
router.get("/", (req, res) => {
  res.send("backend api is running!");
});

//Callback
router.post("/callback", async (req, res, next) => {
  const formInputs = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    requestType: req.body.requestType
  };

  // Logically route to department/ Portal Queue / Entry Point
  let entryPointId = "";
  switch (formInputs.requestType) {
    case "Billing":
      entryPointId = "5bb3b9f1-bacc-4d97-ace1-42ca921af7c4";
      break;
    case "Orders":
      entryPointId = "207843a9-f4ce-4e63-a41c-74309446abfa";
      break;
    case "Support":
      entryPointId = "5bb3b9f1-bacc-4d97-ace1-42ca921af7c4";
      break;
    default:
      entryPointId = "5bb3b9f1-bacc-4d97-ace1-42ca921af7c4";
  }

  const data = JSON.stringify({
    destination: `${formInputs.phone}`,
    entryPointId: `${entryPointId}`,
    attributes: {
      CallReason: `${formInputs.requestType}`,
      CallType: "Web Scheduled Callback",
      Name: `${formInputs.firstName} ${formInputs.lastName}`,
      Email: `${formInputs.email}`
    },
    outboundType: "CALLBACK",
    mediaType: "telephony",
    callback: {
      callbackOrigin: "web",
      callbackType: "immediate"
    }
  });

  const config = {
    method: "post",
    url: "https://api.wxcc-us1.cisco.com/v1/tasks",
    headers: {
      // Enter your Access Token...
      Authorization: "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLkQxN2wzUmZ4YVh5QUJvNUhJUE1vQmcuS3BYSll0Vl91VkNtNVA5d0JiMHJqU25oY2prSXVBcTMyVEdaY0Q0RkxRYkhrWEw3RmxIMjBBM2dSVTdDNk95WWpsWWNndks3SDdBZTNnaWxncHRXYnFTY0dRbjU0dGZJQk5qM1pFUDZ4NXZnbldscGJsSHpRaDVER3lNel9obUxMUmotRlZ6MUJuQ1ppM1IycWJDWmV2THJfblZFMG5JMUEwWi1HbVdnZGg1WW5JUDhSMDUyLUttU29HQ2RVam5VRDdGRXpkT1Vvb1RWQkEzRFBJN3ZaVjN6bTY4eS1WUjBNU3ZyS21raXBDRFpuSlU0MzVwNDVRZWhnMVp2cjVCLWVpdjhTMmF1UFMzNjVqdXY4MnlvV0otVEtpcmtHc1ZFS1lUbkhaMFlfWmJfMnlxRkszaDBwQUFGX2N4VklvZjY0empYRnZpUUhHcE1IRF9US0ZqXzlvWVAxMFhoOTY2Q0xWU0lvb1NfSWJweWRnZDJ4c2JyVjF6a1NNUVpyNTZmSDVUY3VEVS10LWk2bkJRenNDdThzZEVKbjBLaUw5akVJVGJOYmRZbk8tSllEc0g0LWc2R2lvcHlBZVB4QVQxa3dYd3FUQk5aWmdWelg5cVYzQVJPQi1HcmNkaXpQeEJjY25FNFhlbWx4QzVJLW4zOF9SVjQ4NTBscjZHeFBpT2V5NkUyaTVMMTlMS1BiZVdYbzZjOWo4NWdkOExXTzlvSTZwS0tValVBY0xRSTdyaDJLdDFGRDRlS0VGM2tvVGpGRHRvNEtpQ1NQcFZITms0OVBlUFJhdzVvckI5cTdIWFh4Nmx3dW5ZRlZqTS5tdUd6YXg0aXVRc3pEWE02UmZ4czlBIiwidXNlcl90eXBlIjoidXNlciIsInRva2VuX2lkIjoiQWFaM3IwTUdVMU56Qm1OakF0TURnNE9DMDBOamMwTFRnMU5UUXRaREJsTWpsak5UY3lORGN3WldWaE9EUmhZbVV0WWpobSIsInJlZmVyZW5jZV9pZCI6ImYwYzNhNGJmLTc2YTQtNGQzZi1hOTI2LTMwMGVlMzU4N2Q1MSIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInVzZXJfbW9kaWZ5X3RpbWVzdGFtcCI6IjIwMjIwMzMxMTc1OTMxLjQyOFoiLCJyZWFsbSI6IjZlYTg3MDM2LTg5MGQtNDExOC1iZTU2LWMxZjRkOTJhOWU3YSIsImNpc191dWlkIjoiM2VkNzAzMGUtYTcwYy00YThmLTkxZDctMjNhOWI3MTVjMWZjIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyeV90aW1lIjoxNjQ5MjMyOTQzMDgzLCJjbGllbnRfaWQiOiJDNTgyNTRmMzhjZTAwZWM3YWZkMWI2MDY2Zjk3ZTNjMjY4MGY4MTlmYWVmZTY4YTk2NTIxOTdhM2E5ZTE4ODdjNCJ9.MpzBXqGrJlvzv50w2hdCgwM3u9HqezkPvGJP-sARk6j5Jt84rXmU2eXPc5CesPG0xwYp8DzW-7n40YculcNxSn9QoSz3DL5_TdOrT0Ipeu2XU7f-hzbNcMW1Luppj-8vQprghYpCtfQUDzDFuvu2qpMefIQzGJVd-ORr1Cj8c05y1a9S0s6WUwAdd60nA8_Z11iMmGdDElZ3iHAD_GDRhIlkuYiTi7HMB4Mo9kqoCkIM069CrirXULWHTUkqnZYdEPU72_qyteFQOJKsPwIBFTb9qkwvjYwv-9oIuUXayxhkYWHCoTzpWcGv1NlEoPHcntBrdo0Y_kW4MfbmHRwv5Q",
      "Content-Type": "application/json"
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    res.json({
      msg: "success"
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "fail"
    });
  }
});

app.use("/api", router);

app.listen(process.env.PORT || 5000, function () {
  console.log("Server is running at PORT:5000");
});

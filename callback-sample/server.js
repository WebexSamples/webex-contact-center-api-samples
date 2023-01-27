//Express Configuration
import express from "express";
import axios from "axios";
import cors from "cors";
//import localtunnel from "localtunnel";


// Localtunnel Wrapper used for Local dev testing on APIs that need public HTTPS access...
/*(async() => {
    console.log("hey");
    const tunnel = await localtunnel({
        port: 5000,
        // Give a unique subdomain. Or you can delete this object to get a random assigned
        subdomain: "shri1234"

    });
    console.log("hey1");
    // The assigned public url for your tunnel  i.e. https://abcdefgjhij.localtunnel.me
    let url = tunnel.url;
    console.log(url); // copy the URL and add to to your POST / WebHook, etc...

    tunnel.on("close", () => {
        // tunnels are closed
    });
})();*/

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
router.post("/callback", async(req, res, next) => {
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
            entryPointId = "b886896f-05da-4b19-9578-cba18657cb49";
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
            Authorization: "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLjM3dTV6NWpJSEdQYnJpSmVzOHdJdEEuTTJvLVdYREY0elhyT3JFeHFEY2RLUEpONml2aW5JUU9sSmZfeGplNmMzZ0JxdDllT1UtZHpRbjVMU1k1VkJqaWl1QXpYZVo0ZkR3TmxtVWUyQjR3YXFkcm15U3BFM0hJR3RUeGR6cWdUN2E0bXNUUWdyOFBhbTlrR3JuOXRqdTU0WTVOcjBwUmZ0bEFnWGg0dks2X21iLThfbEdTa015cmNIMUl2M3ltc2lCb3lKdU9ENHJiTDlURlJpenRCeldlR2VveTFMQl9Wd3NIMkE5YzFHLTJCU1Q2WnROVXYwb2dkNl8weXFyeTFfVTlMWmtfamVHRXFXdExQSWxOb3FyS3FBZDk0cFR0QWNZY0xoMktEb3lHVnd6ZGxHaUtSc2lsd1gxWGplS2w0M1hRcUFhdmlfOEZhVmFxNVgzdFdCWldmZS1SSVl2QzhYUVlUemxvSnc2allJWW41U3NZc2pDdXlCVVFXbmtobUpPV0owSmZreU5jMVFUbWxYbzJQRlptRVJMZ1puYzFGREFiT2VEV3ZhdWZqa3J5WkJpS2NiNThBUmpoT3Zid3l5Tm9XOEFUTTZqTzJrOC1HTHJMUmViZ0pEODRFY0dxOC1IS25BbjJ0T0ZhSTh2aUZHSjJLeGJveHc2STI4MHJCQ09NRDhQSUFwNFdsWldkM0Z1LXhVTjhONlo5Y21yXzhXdzEySnRXTE1LbFFuMnFfYWY2b0wzYUhpWEQ5Wk41ZlpHX2FPd0pJRVY4anEzcDNVdzlkTVhJM1hFWXRodExWb1N4RWdqZkJFMlRkeEFleFctT2tIeGhGei1fQjlUNmZoZW9QcTdRbHAwUmtNNHhFeEExOU9JNHhhdXdWdENqSGJldlJPSWdpeURsTjBHb0tWV25ZWV9iSHFPWURnTkxweEVvNjVJOEJPREx1UThSRlNIS3p3US0uUkZfcFlWZ20zWUtnQlkyejlCSFpLQSIsInVzZXJfdHlwZSI6InVzZXIiLCJ0b2tlbl9pZCI6IkFhWjNyMFpXSmtOemRrTnpVdE16UTNZUzAwWmpGbUxXRmtPRFF0Tnprd05qWTNOamN6T0dNMk5HTTFNR0ZoWkdNdFlXVTQiLCJyZWZlcmVuY2VfaWQiOiJkM2MxN2UwZi1kMjlhLTQ0ZDAtYjVhOC1hMWJiMGRkZWE0OTAiLCJpc3MiOiJodHRwczpcL1wvaWRicm9rZXIud2ViZXguY29tXC9pZGIiLCJ1c2VyX21vZGlmeV90aW1lc3RhbXAiOiIyMDIzMDExNjIzMzEzNC44MDdaIiwicmVhbG0iOiI2NjA4MTIyZC01MGY1LTQ1NTgtYmU3Mi00ZTlmMjZjNmE0MmYiLCJjaXNfdXVpZCI6ImVhMzZhMTEwLTlhODgtNDI1MC1iOGY2LWFlMGUxYjM5MDhhYyIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJleHBpcnlfdGltZSI6MTY3NDYzMjk2MDc5NywiY2xpZW50X2lkIjoiQzU4MjU0ZjM4Y2UwMGVjN2FmZDFiNjA2NmY5N2UzYzI2ODBmODE5ZmFlZmU2OGE5NjUyMTk3YTNhOWUxODg3YzQifQ.ecIcMkvYQnWGi00l9ffi6XmtH8hnjiPZYFZ30WPh7mbzg-dSQicALAejoKfa3_yQtbol_GSZ6jftDPo7a3b4KnEPh1Mcbsjom3uso37TN0HU8SEBnH4smb3C044evczmGRltXz2jnIWp1gUBPQTTvgjNJy7Q1b7u-C82EviB03EYF8PYHFNWzXcXenSjdym9qHKw5o78qhf6gMJ7LAgzXZX7icFTIweExoor6iX5PPlXS5erXPME-vozBtMnTZ72QolAzlRe008Dfu6wRAOye57CtdlSf3pWI1siHWJ9aj4kg1JafkzwoeLaW07a--O-HwhfWza25mw7H008ltu65Q",
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

app.listen(process.env.PORT || 5000, function() {
    console.log("Server is running at PORT:5000");
});
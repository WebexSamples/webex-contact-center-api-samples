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
            Authorization: "Bearer token",
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
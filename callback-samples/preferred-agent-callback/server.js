//Express Configuration
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3000;

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

//Preferred Callback
router.post("/preferred", async (req, res, next) => {
  const formInputs = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    requestType: req.body.requestType
  };

  // Logically route to department/ Portal Queue / Entry Point
  let entryPointId = "";
  let preferredAgent = "";
  switch (formInputs.requestType) {
    case "Agent1":
      entryPointId = "add your tenant Entry Point";
      preferredAgent = "add your agent email or ID";
      break;
    case "Agent2":
      entryPointId = "add your tenant Entry Point";
      preferredAgent = "add your agent email or ID";
      break;
    case "Agent3":
      entryPointId = "add your tenant Entry Point";
      preferredAgent = "add your agent email or ID";
      break;
    case "Agent4":
      entryPointId = "add your tenant Entry Point";
      preferredAgent = "add your agent email or ID";
      break;
    default:
      entryPointId = "add your tenant Entry Point";
  }

  const data = JSON.stringify({
    destination: `${formInputs.phone}`,
    entryPointId: `${entryPointId}`,
    origin: "add your outbound ANI",
    attributes: {
      preferredAgent: `${preferredAgent}`
    },
    outboundType: "EXECUTE_FLOW",
    mediaType: "telephony"
  });

  const config = {
    method: "post",
    url: "https://api.wxcc-us1.cisco.com/v1/tasks",
    headers: {
      // Enter your Access Token...
      Authorization: "Bearer <add your tenant token>",
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

app.use("/", router);

app.listen(process.env.PORT || port, function () {
  console.log(`Server is running at PORT:${port}`);
});

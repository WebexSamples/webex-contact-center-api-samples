import express from "express";
const app = express();
const port = process.env.PORT || 3001;

//needed for CommonJS
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/src"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

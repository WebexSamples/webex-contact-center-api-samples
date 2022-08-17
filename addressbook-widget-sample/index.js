import express from 'express';
const app = express();
const port = process.env.PORT || 5000;

//needed for CommonJS
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/src'));
app.listen(port, () => {
  console.log('listening on 5000');
});

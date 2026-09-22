import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import {fileURLtoPath} from "url";

const_dirname = path.dirname(fileURLtoPath(import.meta.url));
dotenv.config({path: path.join(__dirname, ".env")})
const app = express();
app.use(cors());
app.use(express.json());
console.log("key loaded:", Boolean(key), "region:", region);

const key = process.env.MS_TRANSLATOR_KEY;
const region = process.env.MS_TRANSLATOR_REGION;

app.post("/translate", async (req, res) => {
    console.log("Received:", req.body);
  const { text, from, to } = req.body;

  const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": key,
      "Ocp-Apim-Subscription-Region": region
    },
    body: JSON.stringify([{ Text: text }])
  });

  const data = await response.json();
   console.log("Backend response:", data);  
  res.json(data);
});

app.listen(3000, () => console.log("Backend running on port 3000"));


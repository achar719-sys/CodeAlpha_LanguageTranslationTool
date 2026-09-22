import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

// Load .env from this file's folder, not from wherever node was launched
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const key = process.env.MS_TRANSLATOR_KEY;
const region = process.env.MS_TRANSLATOR_REGION;
console.log("key loaded:", Boolean(key), "region:", region);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/translate", async (req, res) => {
    console.log("Received:", req.body);
  const { text, from, to } = req.body;

  const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`;

  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": key
  };
  // Global Translator resources must not send a region header, so leave MS_TRANSLATOR_REGION blank for those
  if (region) headers["Ocp-Apim-Subscription-Region"] = region;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify([{ Text: text }])
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Azure error:", response.status, data);
      return res.status(response.status).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error("Could not reach Azure:", err);
    res.status(502).json({ error: { message: "Could not reach Azure Translator" } });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));

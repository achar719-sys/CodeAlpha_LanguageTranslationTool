# AI Translator

A simple translator app. Type some text, pick the source and target language, and it translates it with Microsoft Azure Translator. You can copy the result or have the browser read it out loud.

The API key never goes to the browser. The page sends your text to a small Express server, and the server calls Azure using the key from `.env`.

## What you need

- Node.js 18 or newer
- An Azure Translator resource (the free F0 tier is fine)

## Setup

1. Clone the repo and install the dependencies:

   ```
   git clone https://github.com/achar719-sys/CodeAlpha_LanguageTranslationTool.git
   cd CodeAlpha_LanguageTranslationTool
   npm install
   ```

2. Make a `.env` file in the same folder as `server.js` by copying the example:

   ```
   copy .env.example .env      (Windows)
   cp .env.example .env        (Mac/Linux)
   ```

   Then open it and fill in your key and region:

   ```
   MS_TRANSLATOR_KEY=your-key
   MS_TRANSLATOR_REGION=eastus
   ```

   Both are in the Azure portal: open your Translator resource and go to **Keys and Endpoint**. Use the location code like `eastus`, not the display name "East US". If the region says **Global**, leave `MS_TRANSLATOR_REGION` empty.

   `.env` is in `.gitignore` so the key never gets committed. Don't put the key in `index.html` or in GitHub secrets, the app doesn't read either of those.

3. Start the server:

   ```
   npm start
   ```

   You should see:

   ```
   key loaded: true region: eastus
   Backend running on port 3000
   ```

4. Open http://localhost:3000 in your browser. Opening `index.html` with VS Code Live Preview works too, as long as the server is running.

## Troubleshooting

**`key loaded: false`** means the server can't find `.env`. Make sure it's in the same folder as `server.js` and didn't get saved as `.env.txt`. Restart the server after you edit it.

**"Could not reach the backend"** means the server isn't running. Run `npm start` and leave that terminal open.

**"The request is not authorized because credentials are missing or invalid"** means Azure rejected the key. Check that it came from a Translator resource and that the region matches what Keys and Endpoint shows (or is blank for Global). A key you just regenerated can take a few minutes to start working.

**Quota exceeded** means you've used the free tier's 2 million characters for the month.

## Files

- `index.html` is the page
- `server.js` is the Express server that talks to Azure
- `.env.example` shows what goes in `.env`

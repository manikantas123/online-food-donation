

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      })
    });

    const data = await response.json();
    res.json({ translatedText: data.translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ translatedText: null });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

app.post('/api/simplify', async (req, res) => {
  try {
    const { text } = req.body;
    // Using the stable Feb 2026 model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Strict prompt to remove asterisks and force clean lines
    const prompt = `Simplify this for a dyslexic reader. 
    Rules:
    1. Break text into very short, simple sentences.
    2. Return ONLY the sentences.
    3. Do NOT use any asterisks (**), bolding, or markdown symbols.
    4. Start each new point on a new line.
    
    Text to simplify: ${text}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Cleans up any remaining symbols just in case
    const cleanLines = responseText
      .split('\n')
      .map(line => line.replace(/[*•-]/g, "").trim())
      .filter(line => line.length > 0);
    
    res.json({ output: cleanLines });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
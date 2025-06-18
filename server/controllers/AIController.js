require('dotenv').config(); 

const axios = require('axios');

exports.suggestImprovements = async (req, res) => {
  try {
    const resume = req.body;
    const prompt = `Suggest improvements for this resume:\n\n${JSON.stringify(resume, null, 2)}`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('AI Response:', response.data);
    res.json({ suggestions: response.data.choices[0].message.content });
  } catch (error) {
    console.error('AI Suggestion Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
};

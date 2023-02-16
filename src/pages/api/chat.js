const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Respond as you were the ChatGPT conversational AI with a natural, detailed and clear answer to the next message:\n\n${prompt}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })
    if (!response.ok) {
      console.error(response.statusText)
      return res.status(500).json({ error: 'OpenAI API error' })
    }

    const json = await response.json()
    return res.status(200).json({ ok: true, response: json.choices[0].text })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

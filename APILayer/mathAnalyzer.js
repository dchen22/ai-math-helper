import fetch from 'node-fetch';

export async function analyzeMathProblem(problem) {
  try {
    console.error(problem)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: `Analyze this math problem: ${problem}\n\nProvide the following information in JSON format:\n1. type: The type of math problem (e.g., algebra, calculus, geometry)\n2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem\n3. commonMistakes: An array of 2-3 common mistakes students might make\n4. relatedTopics: An array of 3-4 related math topics\n5. difficultyLevel: Easy, Medium, or Hard\n6. nextSteps: Next steps for learning and practice\n\nFormat your response exactly like this:\n{\n  "type": "",
  "hints": [],
  "commonMistakes": [],
  "relatedTopics": [],
  "difficultyLevel": "",
  "nextSteps": []\n}`
        }]
      })
    });

    const fullResponse = await response.json();
    const messageContent = fullResponse.choices[0].message.content;
    console.error(messageContent)
    // Extract only the JSON content between the first { and last }
    const jsonStart = messageContent.indexOf('{');
    const jsonEnd = messageContent.lastIndexOf('}') + 1;
    const jsonContent = messageContent.substring(jsonStart, jsonEnd);
    const analysis = JSON.parse(jsonContent);

    console.log('Groq Response:', {
      tokens: fullResponse.usage.total_tokens,
      time: fullResponse.usage.total_time,
      model: fullResponse.model
    });

    console.log('Parsed Analysis:', analysis);
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing math problem:', error);
    return {
      "type": "",
      "hints": [],
      "commonMistakes": [],
      "relatedTopics": [],
      "difficultyLevel": "",
      "nextSteps": []
    }
  }
}

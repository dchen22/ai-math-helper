curl https://api.groq.com/openai/v1/chat/completions -s -H "Content-Type: application/json" -H "Authorization: Bearer $GROQ_API_KEY" -d '{
"model": "meta-llama/llama-4-scout-17b-16e-instruct",
"messages": [{
    "role": "user",
    "content": "Analyze this math problem: How to solve 3x+6=9\n\nProvide the following information in JSON format:\n1. type: The type of math problem (e.g., algebra, calculus, geometry)\n2. hints: An array of 3-5 hints to help solve the problem\n3. commonMistakes: An array of 2-3 common mistakes students might make\n4. relatedTopics: An array of 3-4 related math topics\n5. difficultyLevel: Easy, Medium, or Hard\n6. nextSteps: Next steps for learning and practice\n\nFormat your response exactly like this:\n{\n  \"type\": \"\",\n  \"hints\": [],\n  \"commonMistakes\": [],\n  \"relatedTopics\": [],\n  \"difficultyLevel\": \"\",\n  \"nextSteps\": []\n}"
}]}' >| APILayer/output.json
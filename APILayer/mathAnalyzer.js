import { Groq } from 'groq-sdk';

export async function analyzeMathProblem(text, image) {
  try {
    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    if (text && image) {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are a math problem analyzer. You will be given both a text description and an image containing a math problem.\n\nText description: ${text}\n\nPlease analyze both the text description and the image together to provide a comprehensive analysis. Combine insights from both sources to provide the following information in JSON format:\n1. type: The type of math problem (e.g., algebra, calculus, geometry)\n2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem\n3. commonMistakes: An array of 2-3 common mistakes students might make\n4. relatedTopics: An array of 3-4 related math topics\n5. difficultyLevel: Easy, Medium, or Hard\n6. nextSteps: Next steps for learning and practice\n\nFormat your response exactly like this:\n{\n  \"type\": \"\",\n  \"hints\": [],\n  \"commonMistakes\": [],\n  \"relatedTopics\": [],\n  \"difficultyLevel\": \"\",\n  \"nextSteps\": []\n}\nNote: Consider both the text description and the image content when providing your analysis.\n\nImage follows below: `
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${image}`
                }
              }
            ]
          }
        ],
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      const messageContent = chatCompletion.choices[0].message.content;
      console.log('Groq Response:', {
        tokens: chatCompletion.usage.total_tokens,
        time: chatCompletion.usage.total_time,
        model: chatCompletion.model
      });

      // Extract only the JSON content between the first { and last }
      const jsonStart = messageContent.indexOf('{');
      const jsonEnd = messageContent.lastIndexOf('}') + 1;
      const jsonContent = messageContent.substring(jsonStart, jsonEnd);
      const analysis = JSON.parse(jsonContent);

      console.log('Parsed Analysis:', analysis);
      return analysis;
    } else if (text && !image) {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this math problem: ${text}\n\nProvide the following information in JSON format:\n1. type: The type of math problem (e.g., algebra, calculus, geometry)\n2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem\n3. commonMistakes: An array of 2-3 common mistakes students might make\n4. relatedTopics: An array of 3-4 related math topics\n5. difficultyLevel: Easy, Medium, or Hard\n6. nextSteps: Next steps for learning and practice\n\nFormat your response exactly like this:\n{\n  \"type\": \"\",\n  \"hints\": [],\n  \"commonMistakes\": [],\n  \"relatedTopics\": [],\n  \"difficultyLevel\": \"\",\n  \"nextSteps\": []\n}`
              }
            ]
          }
        ],
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      const messageContent = chatCompletion.choices[0].message.content;
      console.log('Groq Response:', {
        tokens: chatCompletion.usage.total_tokens,
        time: chatCompletion.usage.total_time,
        model: chatCompletion.model
      });

      // Extract only the JSON content between the first { and last }
      const jsonStart = messageContent.indexOf('{');
      const jsonEnd = messageContent.lastIndexOf('}') + 1;
      const jsonContent = messageContent.substring(jsonStart, jsonEnd);
      const analysis = JSON.parse(jsonContent);

      console.log('Parsed Analysis:', analysis);
      return analysis;
    } else if (image && !text) {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are a math problem analyzer. You will be given an image containing a math problem in base64 format.\n\nPlease analyze the math problem shown in the image and provide the following information in JSON format:\n1. type: The type of math problem (e.g., algebra, calculus, geometry)\n2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem\n3. commonMistakes: An array of 2-3 common mistakes students might make\n4. relatedTopics: An array of 3-4 related math topics\n5. difficultyLevel: Easy, Medium, or Hard\n6. nextSteps: Next steps for learning and practice\n\nFormat your response exactly like this:\n{\n  \"type\": \"\",\n  \"hints\": [],\n  \"commonMistakes\": [],\n  \"relatedTopics\": [],\n  \"difficultyLevel\": \"\",\n  \"nextSteps\": []\n}\nNote: Focus on analyzing the math problem shown in the image. The image may contain handwritten or typed math problems. Try to extract the problem statement and provide analysis based on that.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${image}`
                }
              }
            ]
          }
        ],
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      const messageContent = chatCompletion.choices[0].message.content;
      console.log('Groq Response:', {
        tokens: chatCompletion.usage.total_tokens,
        time: chatCompletion.usage.total_time,
        model: chatCompletion.model
      });

      // Extract only the JSON content between the first { and last }
      const jsonStart = messageContent.indexOf('{');
      const jsonEnd = messageContent.lastIndexOf('}') + 1;
      const jsonContent = messageContent.substring(jsonStart, jsonEnd);
      const analysis = JSON.parse(jsonContent);

      console.log('Parsed Analysis:', analysis);
      return analysis;
    } else {
      throw new Error('No input provided - please provide either text or an image');
    }
    // Create appropriate prompt based on input types
    let prompt;

    if (image && !text) {
      // Only image provided
      prompt = `You are a math problem analyzer. You will be given an image containing a math problem in base64 format. 
            
      Please analyze the math problem shown in the image and provide the following information in JSON format:
      1. type: The type of math problem (e.g., algebra, calculus, geometry)
      2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem
      3. commonMistakes: An array of 2-3 common mistakes students might make
      4. relatedTopics: An array of 3-4 related math topics
      5. difficultyLevel: Easy, Medium, or Hard
      6. nextSteps: Next steps for learning and practice
      
      Format your response exactly like this:
      {
        "type": "",
        "hints": [],
        "commonMistakes": [],
        "relatedTopics": [],
        "difficultyLevel": "",
        "nextSteps": []
      }
      
      Note: Focus on analyzing the math problem shown in the image. The image may contain handwritten or typed math problems. Try to extract the problem statement and provide analysis based on that.`;
    } else if (text && !image) {
      // Only text provided
      prompt = `Analyze this math problem: ${text}\n\nProvide the following information in JSON format:\n1. type: The type of math problem (e.g., algebra, calculus, geometry)\n2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem\n3. commonMistakes: An array of 2-3 common mistakes students might make\n4. relatedTopics: An array of 3-4 related math topics\n5. difficultyLevel: Easy, Medium, or Hard\n6. nextSteps: Next steps for learning and practice\n\nFormat your response exactly like this:\n{\n  "type": "",
    "hints": [],
    "commonMistakes": [],
    "relatedTopics": [],
    "difficultyLevel": "",
    "nextSteps": []\n}`;
    } else if (text && image) {
      // Both text and image provided
      prompt = `You are a math problem analyzer. You will be given both a text description and an image containing a math problem.
      
      Text description: ${text}
      
      Image contains: ${image}
      
      Please analyze both the text description and the image together to provide a comprehensive analysis. Combine insights from both sources to provide the following information in JSON format:
      1. type: The type of math problem (e.g., algebra, calculus, geometry)
      2. hints: An array of VERY DETAILED 3-5 hints to help solve the problem
      3. commonMistakes: An array of 2-3 common mistakes students might make
      4. relatedTopics: An array of 3-4 related math topics
      5. difficultyLevel: Easy, Medium, or Hard
      6. nextSteps: Next steps for learning and practice
      
      Format your response exactly like this:
      {
        "type": "",
        "hints": [],
        "commonMistakes": [],
        "relatedTopics": [],
        "difficultyLevel": "",
        "nextSteps": []
      }
      
      Note: Consider both the text description and the image content when providing your analysis. The text may provide additional context or clarify aspects of the problem shown in the image.`;
    } else {
      throw new Error('No input provided - please provide either text or an image');
    }

    // Use Groq SDK to make the API call
    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{
        role: "user",
        content: prompt
      }]
    });

    const messageContent = completion.choices[0].message.content;
    console.error(messageContent)
    console.log('Groq Response:', {
      tokens: completion.usage.total_tokens,
      time: completion.usage.total_time,
      model: completion.model
    });

    // Extract only the JSON content between the first { and last }
    const jsonStart = messageContent.indexOf('{');
    const jsonEnd = messageContent.lastIndexOf('}') + 1;
    const jsonContent = messageContent.substring(jsonStart, jsonEnd);
    const analysis = JSON.parse(jsonContent);

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

import express from 'express';
import cors from 'cors';
import { analyzeMathProblem } from './mathAnalyzer.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for the frontend origin (e.g., http://localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// POST /api/submit-code
// Expects JSON payload: { code: string }
app.post('/api/submit-code', async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ 
          success: false, 
          error: 'No problem provided' 
        });
      }

      console.log('Processing math problem:', code);
      const analysis = await analyzeMathProblem(code);
    //   const analysis = "Good"
      return res.json({ 
        success: true,
        ...analysis
      });
    } catch (err) {
      console.error('Error processing math problem:', err);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to analyze math problem',
        details: err.message 
      });
    }
  });

function detectProblemType(problem) {
    // TODO: Implement actual problem type detection
    // For now, return a mock type
    return 'algebra';
}

function generateHints(problem) {
    // TODO: Implement actual hint generation
    return [
        'Start by identifying the type of problem',
        'Break down the problem into smaller parts',
        'Check if there are any formulas that might be relevant'
    ];
}

function identifyCommonMistakes(problem) {
    // TODO: Implement actual mistake identification
    return [
        'Forgetting to distribute negative signs',
        'Incorrectly combining like terms',
        'Missing parentheses in complex expressions'
    ];
}

function suggestRelatedTopics(problem) {
    // TODO: Implement actual topic suggestion
    return [
        'Basic algebra',
        'Equation solving',
        'Polynomial operations'
    ];
}

app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
    console.log('Make sure to run this server before making requests from the frontend.');
});

import express from 'express';
import cors from 'cors';
import { analyzeMathProblem } from './mathAnalyzer.js';
import dotenv from 'dotenv';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Load environment variables from .env file
dotenv.config({ path: '.env' });

// Validate API key
if (!process.env.GROQ_API_KEY) {
    console.error('Error: GROQ_API_KEY not found in environment variables');
    process.exit(1);
}

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
app.post('/api/analyze', upload.single('file'), async (req, res) => {
    try {
        // Get the text input if present
        const text = req.body.code || '';
        
        // Convert image to base64 if present
        let image = '';
        if (req.file) {
            image = req.file.buffer.toString('base64');
            console.log('Processing image file:', req.file.originalname);
        }

        // Validate that at least one input is provided
        if (!text && !image) {
            return res.status(400).json({ 
                success: false, 
                error: 'No input provided - please provide either text or an image' 
            });
        }

        // Analyze the problem using both inputs
        const analysis = await analyzeMathProblem(text, image);
        
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

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Textarea, Input, Button } from '../components/ui';

export default function MathProblemPage() {
    const [latex, setLatex] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = {
                code: latex
            };

            const response = await fetch('http://localhost:4000/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const responseData = await response.json();
            console.log('API Response:', responseData);
            setResponse(responseData);
        } catch (error) {
            console.error('Error:', error);
            setResponse({ 
                success: false, 
                error: error.message || 'Failed to analyze problem' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <Card className="shadow-lg">
                    <CardContent>
                        <div className="space-y-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-magenta-600 mb-2">Math Problem Analyzer</h1>
                                <p className="text-gray-600">Enter your math problem or upload an image</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Math Problem (LaTeX)</label>
                                    <Textarea
                                        value={latex}
                                        onChange={(e) => setLatex(e.target.value)}
                                        placeholder="Enter your math problem in LaTeX format..."
                                        className="bg-orange-50 rounded-lg p-3 focus:ring-2 focus:ring-magenta-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                                    <Input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="bg-orange-50 rounded-lg p-2 focus:ring-2 focus:ring-magenta-500"
                                    />
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-magenta-600 hover:bg-magenta-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    {loading ? 'Analyzing...' : 'Analyze Problem'}
                                </Button>
                            </div>

                            {response && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 bg-orange-50 rounded-lg"
                                >
                                    <h2 className="text-xl font-semibold text-magenta-600 mb-2">Analysis Results</h2>
                                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {JSON.stringify(response, null, 2)}
                                    </pre>
                                </motion.div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

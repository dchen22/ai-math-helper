// src/App.jsx
import React from 'react'
import MathProblemForm from './components/MathProblemForm'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Math Helper</h1>
        <MathProblemForm />
      </div>
    </div>
  )
}



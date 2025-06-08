// src/App.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import MathProblemForm from './components/MathProblemForm'
import { Button } from './components/ui/button.tsx'

export default function App() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Math Helper</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome, {user.email}</span>
            <Button onClick={signOut} variant="outline">
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto py-8 px-4">
        <MathProblemForm />
      </main>
    </div>
  )
}



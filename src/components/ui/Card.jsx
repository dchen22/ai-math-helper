// src/components/ui/Card.jsx
export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-lg shadow p-4 bg-white ${className}`}>
      {children}
    </div>
  )
}

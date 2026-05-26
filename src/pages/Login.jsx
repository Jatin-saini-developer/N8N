import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      // We will connect this to backend later
      // For now just simulate login
      localStorage.setItem('token', 'test-token')
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-blue-400 text-3xl font-bold tracking-tight">
            ZeroDay
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Automate your developer onboarding
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">

          <h2 className="text-white text-xl font-semibold mb-6">
            Welcome back
          </h2>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full mt-1.5 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1.5 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mt-6 pt-6">
            <p className="text-gray-500 text-sm text-center">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login
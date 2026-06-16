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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] border border-white/[0.06]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-white">
              DevOnboard
            </span>
          </Link>
          <p className="text-neutral-600 text-[13px] mt-3">
            Automate your developer onboarding
          </p>
        </div>

        {/* Card */}
        <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-7">

          <h2 className="text-white text-lg font-semibold mb-6">
            Welcome back
          </h2>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/[0.06] border border-red-500/[0.1] text-red-400/80 text-[13px] rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">

            <div>
              <label className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full mt-1.5 bg-white/[0.02] border border-white/[0.06] text-white text-[14px] rounded-lg px-4 py-2.5 outline-none focus:border-white/[0.15] transition-colors placeholder-neutral-700"
              />
            </div>

            <div>
              <label className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1.5 bg-white/[0.02] border border-white/[0.06] text-white text-[14px] rounded-lg px-4 py-2.5 outline-none focus:border-white/[0.15] transition-colors placeholder-neutral-700"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed text-black text-[14px] font-semibold rounded-lg px-4 py-2.5 transition-all duration-200 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.04] mt-6 pt-6">
            <p className="text-neutral-600 text-[13px] text-center">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-neutral-300 hover:text-white font-medium transition-colors duration-200"
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
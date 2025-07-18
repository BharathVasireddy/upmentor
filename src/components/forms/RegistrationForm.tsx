'use client'

import React, { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  primaryLanguage: '',
  academicLevel: 'school',
}

export default function RegistrationForm() {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      setSuccess(true)
      setForm(initialState)
    } else {
      const data = await res.json()
      setError(
        data.error?.formErrors?.join(', ') ||
          data.error ||
          'Registration failed'
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4 rounded bg-white p-6 shadow"
    >
      <h2 className="mb-2 text-2xl font-bold">Register</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">
          Registration successful! You can now log in.
        </div>
      )}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="primaryLanguage"
        value={form.primaryLanguage}
        onChange={handleChange}
        placeholder="Primary Language"
        className="w-full rounded border p-2"
        required
      />
      <select
        name="academicLevel"
        value={form.academicLevel}
        onChange={handleChange}
        className="w-full rounded border p-2"
      >
        <option value="school">School</option>
        <option value="college">College</option>
      </select>
      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 font-semibold text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}

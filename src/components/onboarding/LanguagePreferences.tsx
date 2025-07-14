'use client'

import React, { useState } from 'react'

type Props = {
  userId: string
  onSuccess: () => void
}

const initialState = {
  primaryLanguage: '',
  languagesSpoken: '',
}

export default function LanguagePreferences({ userId, onSuccess }: Props) {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)
    const payload = {
      userId,
      primaryLanguage: form.primaryLanguage,
      languagesSpoken: form.languagesSpoken
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    }
    const res = await fetch('/api/users/language-preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setLoading(false)
    if (res.ok) {
      setSuccess(true)
      onSuccess()
    } else {
      const data = await res.json()
      setError(
        data.error?.formErrors?.join(', ') || data.error || 'Submission failed'
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4 rounded bg-white p-6 shadow"
    >
      <h2 className="mb-2 text-xl font-bold">Language Preferences</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Saved!</div>}
      <input
        name="primaryLanguage"
        value={form.primaryLanguage}
        onChange={handleChange}
        placeholder="Primary Language"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="languagesSpoken"
        value={form.languagesSpoken}
        onChange={handleChange}
        placeholder="Languages Spoken (comma separated)"
        className="w-full rounded border p-2"
        required
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 font-semibold text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save & Continue'}
      </button>
    </form>
  )
}

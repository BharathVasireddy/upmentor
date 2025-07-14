'use client'

import React, { useState } from 'react'

type Props = {
  userId: string
  onSuccess: () => void
}

const initialState = {
  schoolName: '',
  board: '',
  classGrade: '',
  stream: '',
  subjects: '',
  extracurricular: '',
}

export default function SchoolProfileForm({ userId, onSuccess }: Props) {
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
      academicLevel: 'school',
      schoolName: form.schoolName,
      board: form.board,
      classGrade: form.classGrade,
      stream: form.stream,
      subjects: form.subjects
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      extracurricular: form.extracurricular
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    }
    const res = await fetch('/api/users/academic-details', {
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
      <h2 className="mb-2 text-xl font-bold">School Profile</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Saved!</div>}
      <input
        name="schoolName"
        value={form.schoolName}
        onChange={handleChange}
        placeholder="School Name"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="board"
        value={form.board}
        onChange={handleChange}
        placeholder="Board (e.g. CBSE, ICSE)"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="classGrade"
        value={form.classGrade}
        onChange={handleChange}
        placeholder="Class/Grade (e.g. 10, 12)"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="stream"
        value={form.stream}
        onChange={handleChange}
        placeholder="Stream (e.g. Science, Commerce)"
        className="w-full rounded border p-2"
      />
      <input
        name="subjects"
        value={form.subjects}
        onChange={handleChange}
        placeholder="Subjects (comma separated)"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="extracurricular"
        value={form.extracurricular}
        onChange={handleChange}
        placeholder="Extracurricular (comma separated)"
        className="w-full rounded border p-2"
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

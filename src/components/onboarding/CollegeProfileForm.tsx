"use client";

import React, { useState } from 'react';

type Props = {
  userId: string;
  onSuccess: () => void;
};

const initialState = {
  universityName: '',
  degreeType: '',
  major: '',
  minor: '',
  semester: '',
  cgpa: '',
  projects: '',
  internships: '',
};

export default function CollegeProfileForm({ userId, onSuccess }: Props) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    const payload = {
      userId,
      academicLevel: 'college',
      universityName: form.universityName,
      degreeType: form.degreeType,
      major: form.major,
      minor: form.minor,
      semester: Number(form.semester),
      cgpa: Number(form.cgpa),
      projects: form.projects.split(',').map(s => s.trim()).filter(Boolean),
      internships: form.internships.split(',').map(s => s.trim()).filter(Boolean),
    };
    const res = await fetch('/api/users/academic-details', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error?.formErrors?.join(', ') || data.error || 'Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">College Profile</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Saved!</div>}
      <input
        name="universityName"
        value={form.universityName}
        onChange={handleChange}
        placeholder="University Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="degreeType"
        value={form.degreeType}
        onChange={handleChange}
        placeholder="Degree Type (e.g. B.Tech, B.Sc)"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="major"
        value={form.major}
        onChange={handleChange}
        placeholder="Major"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="minor"
        value={form.minor}
        onChange={handleChange}
        placeholder="Minor (optional)"
        className="w-full border p-2 rounded"
      />
      <input
        name="semester"
        value={form.semester}
        onChange={handleChange}
        placeholder="Semester (number)"
        className="w-full border p-2 rounded"
        required
        type="number"
        min={1}
      />
      <input
        name="cgpa"
        value={form.cgpa}
        onChange={handleChange}
        placeholder="CGPA (0-10)"
        className="w-full border p-2 rounded"
        required
        type="number"
        min={0}
        max={10}
        step={0.01}
      />
      <input
        name="projects"
        value={form.projects}
        onChange={handleChange}
        placeholder="Projects (comma separated)"
        className="w-full border p-2 rounded"
      />
      <input
        name="internships"
        value={form.internships}
        onChange={handleChange}
        placeholder="Internships (comma separated)"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save & Continue'}
      </button>
    </form>
  );
}

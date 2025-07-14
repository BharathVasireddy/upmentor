"use client";

import React, { useState } from 'react';

type Props = {
  userId: string;
  onSuccess: () => void;
};

const initialState = {
  preferredRoles: '',
  targetCompanies: '',
  desiredLocations: '',
  workPreferences: '',
  careerTimeline: '',
  specificConcerns: '',
};

export default function GoalsAssessment({ userId, onSuccess }: Props) {
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
      preferredRoles: form.preferredRoles.split(',').map(s => s.trim()).filter(Boolean),
      targetCompanies: form.targetCompanies ? form.targetCompanies.split(',').map(s => s.trim()).filter(Boolean) : [],
      desiredLocations: form.desiredLocations ? form.desiredLocations.split(',').map(s => s.trim()).filter(Boolean) : [],
      workPreferences: form.workPreferences,
      careerTimeline: form.careerTimeline,
      specificConcerns: form.specificConcerns ? form.specificConcerns.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    const res = await fetch('/api/users/career-goals', {
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
      <h2 className="text-xl font-bold mb-2">Career Goals</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Saved!</div>}
      <input
        name="preferredRoles"
        value={form.preferredRoles}
        onChange={handleChange}
        placeholder="Preferred Roles (comma separated)"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="targetCompanies"
        value={form.targetCompanies}
        onChange={handleChange}
        placeholder="Target Companies (comma separated, optional)"
        className="w-full border p-2 rounded"
      />
      <input
        name="desiredLocations"
        value={form.desiredLocations}
        onChange={handleChange}
        placeholder="Desired Locations (comma separated, optional)"
        className="w-full border p-2 rounded"
      />
      <input
        name="workPreferences"
        value={form.workPreferences}
        onChange={handleChange}
        placeholder="Work Preferences (optional)"
        className="w-full border p-2 rounded"
      />
      <input
        name="careerTimeline"
        value={form.careerTimeline}
        onChange={handleChange}
        placeholder="Career Timeline (optional)"
        className="w-full border p-2 rounded"
      />
      <input
        name="specificConcerns"
        value={form.specificConcerns}
        onChange={handleChange}
        placeholder="Specific Concerns (comma separated, optional)"
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

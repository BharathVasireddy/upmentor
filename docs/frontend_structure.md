# Frontend Component Structure & UI/UX Reference

## Component Groups

### UI (Shadcn/ui)

- button.tsx, input.tsx, select.tsx, modal.tsx, form.tsx, card.tsx, badge.tsx, avatar.tsx, dropdown-menu.tsx, calendar.tsx, index.ts

### Forms

- AcademicProfileForm.tsx, LanguageSelector.tsx, PreSessionForm.tsx, MentorApplicationForm.tsx, ContactForm.tsx

### Layout

- Header.tsx, Footer.tsx, Sidebar.tsx, Navigation.tsx, AuthLayout.tsx, DashboardLayout.tsx, AdminLayout.tsx

### Onboarding

- AcademicLevelSelector.tsx, SchoolProfileForm.tsx, CollegeProfileForm.tsx, LanguagePreferences.tsx, GoalsAssessment.tsx, ProgressStepper.tsx

### Mentors

- MentorCard.tsx, MentorProfile.tsx, MentorGrid.tsx, MentorFilters.tsx, LanguageCompatibility.tsx, AvailabilityCalendar.tsx, RecommendationsList.tsx

### Sessions

- BookingCalendar.tsx, SessionCard.tsx, VideoCallInterface.tsx, SessionNotes.tsx, SessionHistory.tsx, RescheduleModal.tsx

### Dashboard

- StudentDashboard.tsx, MentorDashboard.tsx, AdminDashboard.tsx, ProgressTracker.tsx, UpcomingSessions.tsx, QuickActions.tsx, LanguageStats.tsx

### Admin

- MentorVerification.tsx, UserManagement.tsx, AnalyticsDashboard.tsx, LanguageManagement.tsx, SupportTickets.tsx

### Common

- LoadingSpinner.tsx, ErrorBoundary.tsx, EmptyState.tsx, ConfirmDialog.tsx, ImageUpload.tsx, LanguageSwitcher.tsx, SearchBar.tsx

### Providers

- AuthProvider.tsx, LanguageProvider.tsx, ThemeProvider.tsx, QueryProvider.tsx

---

## UI/UX Best Practices

- Atomic Design Pattern: ui → components → pages
- Single Responsibility: Each component has one clear purpose
- Composition over Inheritance (React patterns)
- TypeScript interfaces for all props
- Barrel exports for clean imports
- Error boundaries for graceful error handling
- Responsive design with Tailwind CSS
- Accessibility: WCAG guidelines
- Skeleton screens for loading, optimistic updates
- Colocation of related files
- Hot reload, error boundaries, loading states

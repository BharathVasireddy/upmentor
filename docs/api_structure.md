# API Endpoints & Backend Structure Reference

## API Route Groups (Next.js 14 App Router)

### Auth

- `/api/auth/register` (POST) — Student registration
- `/api/auth/mentor-register` (POST) — Mentor registration
- `/api/auth/verify-email` (POST) — Email verification
- `/api/auth/verify-otp` (POST) — OTP verification
- `/api/auth/reset-password` (POST) — Password reset
- `/api/auth/[...nextauth]` (ALL) — NextAuth handler

### Users

- `/api/users/profile` (GET, PUT) — User profile
- `/api/users/academic-details` (GET, PUT) — Academic info
- `/api/users/language-preferences` (GET, PUT) — Language prefs
- `/api/users/progress` (GET) — User progress
- `/api/users/deactivate` (POST) — Account deactivation
- `/api/users/[id]` (GET) — Admin: get user by ID

### Mentors

- `/api/mentors` (GET) — All mentors with filters
- `/api/mentors/search` (POST) — Advanced search
- `/api/mentors/[id]` (GET) — Mentor profile
- `/api/mentors/apply` (POST) — Mentor application
- `/api/mentors/availability` (GET, PUT) — Availability
- `/api/mentors/languages` (GET) — By language
- `/api/mentors/verification` (GET, PUT, POST) — Verification status, docs, approve/reject/resubmit
- `/api/mentors/performance` (GET) — Performance metrics
- `/api/mentors/payouts` (GET) — Payout history

### Sessions

- `/api/sessions` (GET, POST) — User sessions, book session
- `/api/sessions/[id]` (GET, PUT, DELETE) — Session details
- `/api/sessions/[id]/notes` (POST) — Session notes
- `/api/sessions/[id]/recording` (GET) — Recording access
- `/api/sessions/[id]/reschedule` (PUT) — Reschedule
- `/api/sessions/[id]/cancel` (PUT) — Cancel session
- `/api/sessions/upcoming` (GET) — Upcoming sessions
- `/api/sessions/history` (GET) — Session history
- `/api/sessions/conflicts` (POST) — Report conflict
- `/api/sessions/emergency` (POST) — Emergency support

### Matching

- `/api/matching/recommendations` (GET) — Personalized recs
- `/api/matching/compatibility` (POST) — Compatibility score
- `/api/matching/language-match` (GET) — Language-based matches
- `/api/matching/precompute` (POST) — Trigger recomputation
- `/api/matching/filters` (GET) — Filter options

### Payments

- `/api/payments/create-intent` (POST) — Create payment intent
- `/api/payments/confirm` (POST) — Confirm payment
- `/api/payments/webhook` (POST) — Stripe webhook
- `/api/payments/refund` (POST) — Process refund
- `/api/payments/dispute` (POST) — Payment dispute
- `/api/payments/history` (GET) — Payment history

### Admin

- `/api/admin/mentors` (GET) — All mentors (admin)
- `/api/admin/mentors/verification` (GET) — Pending verifications
- `/api/admin/mentors/performance` (GET) — Performance reports
- `/api/admin/mentors/suspend` (PUT) — Suspend mentor
- `/api/admin/users` (GET) — All users (admin)
- `/api/admin/sessions` (GET) — All sessions (admin)
- `/api/admin/sessions/conflicts` (GET) — Session conflicts
- `/api/admin/sessions/quality-review` (POST) — Quality review
- `/api/admin/analytics/dashboard` (GET) — Platform analytics
- `/api/admin/analytics/revenue` (GET) — Revenue analytics
- `/api/admin/analytics/usage` (GET) — Usage stats
- `/api/admin/analytics/performance` (GET) — Performance metrics
- `/api/admin/languages` (GET, POST) — Manage languages
- `/api/admin/payouts` (GET, POST) — Process payouts

### Support

- `/api/support/tickets` (GET, POST) — Support tickets
- `/api/support/tickets/[id]` (GET, PUT) — Ticket details
- `/api/support/tickets/escalate` (PUT) — Escalate ticket
- `/api/support/tickets/close` (PUT) — Close ticket
- `/api/support/chat` (POST) — Support chat
- `/api/support/emergency` (POST) — Emergency support
- `/api/support/feedback` (POST) — Platform feedback

### Uploads

- `/api/uploads/profile-images` (POST) — Upload profile image
- `/api/uploads/verification-docs` (POST) — Mentor verification docs
- `/api/uploads/session-recordings` (GET) — Access session recordings

### Notifications

- `/api/notifications` (GET) — User notifications
- `/api/notifications/mark-read` (PUT) — Mark as read
- `/api/notifications/preferences` (GET, PUT) — Notification prefs
- `/api/notifications/push` (POST) — Send push notification

### Health

- `/api/health` (GET) — System health check
- `/api/health/database` (GET) — DB health
- `/api/health/services` (GET) — 3rd-party services health

---

## Security & Middleware Patterns

- **Authentication:** NextAuth.js, JWT, role-based middleware
- **Rate Limiting:** Per route group (e.g., login, booking, payments)
- **Input Validation:** Zod schemas for all endpoints
- **CORS:** Configured for all APIs
- **Error Handling:** Standardized error responses
- **Admin/Mentor/Student Route Protection**
- **Audit Logging:** For sensitive actions

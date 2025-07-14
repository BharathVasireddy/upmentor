# Database Schema & Data Models Reference

## Users
- id, email, phone, name, password_hash
- profile_image, date_of_birth, gender
- city, state, country, timezone
- current_grade, academic_level, institution_name
- field_of_study, graduation_year, gpa_score
- interests[], career_goals[], preferred_industries[]
- primary_language, languages_spoken[], linkedin_url
- created_at, updated_at, is_verified, onboarding_completed
- last_active, account_status, parent_email

## Academic Details
- id, user_id, academic_level
- school_name, board, class_grade, stream
- subjects[], extracurricular[]
- university_name, degree_type, major, minor
- semester, cgpa, projects[], internships[]
- achievements[], goals[], challenges[]
- created_at, updated_at

## Career Preferences
- id, user_id, preferred_roles[], target_companies[]
- desired_locations[], work_preferences, career_timeline
- specific_concerns[], created_at, updated_at

## Mentors
- id, user_id, title, university, company
- experience_years, expertise_areas[], academic_specializations[]
- industry_focus[], student_levels_served[], hourly_rate, bio
- linkedin_url, verification_status, verification_docs[], verification_notes
- verified_by, verified_at, rejection_reason
- total_sessions, avg_rating, response_time
- primary_language, languages_spoken[], timezone
- is_active, mentor_type, performance_score
- payout_details, tax_information, background_check_status

## Mentor Verification
- id, mentor_id, verification_type, document_type
- document_url, verification_status, submitted_at
- reviewed_by, reviewed_at, rejection_reason
- expiry_date, auto_reverify_date

## User Roles
- id, user_id, role_type, permissions[]
- assigned_by, assigned_at, is_active

## Admin Users
- id, user_id, admin_type, department
- permissions[], managed_regions[], managed_languages[], created_at

## Languages
- id, language_code, language_name
- is_active, region, native_speakers_count

## Mentor Compatibility (Precomputed)
- id, mentor_id, student_segment, base_score
- language_score, academic_score, location_score
- last_computed, is_active

## Sessions
- id, user_id, mentor_id, scheduled_at, duration, amount, status, payment_id
- session_type, session_language, user_questions[], mentor_notes
- video_room_id, recording_url, recording_access_expires
- follow_up_tasks[], satisfaction_rating, mentor_rating, created_at
- cancellation_reason, rescheduled_from, conflict_resolution

## Session Conflicts
- id, session_id, conflict_type, reported_by, reported_at
- resolution_type, resolved_by, resolved_at, compensation_amount, notes

## Payments
- id, session_id, user_id, mentor_id, amount, platform_fee, mentor_earnings
- payment_method, status, payment_gateway_id, gateway_response
- refund_amount, refund_reason, refunded_at, payout_id, payout_status, created_at

## Mentor Payouts
- id, mentor_id, payout_period_start, payout_period_end
- total_earnings, platform_fee, tax_deduction, net_amount
- payout_method, payout_reference, status, processed_at, created_at

## User Progress
- id, user_id, milestone_type, milestone_data, achieved_at
- mentor_id, session_id, progress_notes, next_steps[]

## Quality Reviews
- id, mentor_id, review_type, reviewer_id, review_date
- rating, feedback, action_taken, follow_up_required, created_at

## Support Tickets
- id, user_id, ticket_type, priority, status, subject, description
- assigned_to, created_at, resolved_at, resolution_notes, satisfaction_rating

## Audit Logs
- id, user_id, action_type, resource_type, resource_id
- old_values, new_values, ip_address, user_agent, created_at

---

### Relationships
- **users** 1---* **academic_details**, **career_preferences**, **user_roles**, **sessions**, **user_progress**, **support_tickets**, **audit_logs**
- **mentors** 1---* **mentor_verification**, **mentor_compatibility**, **sessions**, **mentor_payouts**, **quality_reviews**
- **sessions** 1---* **session_conflicts**, **payments**
- **payments** 1---* **mentor_payouts** 
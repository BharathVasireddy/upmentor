# Security, Performance & Compliance Reference

## Security Requirements
- JWT token authentication
- Input validation and sanitization (Zod)
- Rate limiting on APIs (per route group)
- CORS configuration for all APIs
- Secure payment processing (PCI compliance)
- Data encryption (AES-256 at rest, TLS 1.3 in transit)
- Multi-factor authentication for sensitive operations
- Role-based access control (RBAC)
- Audit logging for sensitive actions
- Enhanced child safety (age verification, parental consent, session monitoring, content filtering)
- Fraud prevention (ID verification, AI-based monitoring)
- Content moderation (AI + human review)

## Performance Requirements
- Database queries: < 100ms
- API responses: 95% < 500ms
- Page loads: FCP < 1.5s
- Search/filter APIs: < 200ms
- Mentor recommendations: < 300ms
- Session booking: Immediate confirmation, background processing
- Caching: Redis for DB queries, API response caching, React Query client cache
- Optimistic UI updates, lazy loading, code splitting
- Real-time features: WebSockets, background sync
- Monitoring: API response time tracking, client-side performance tracking
- Connection pooling for DB
- CDN for static assets

## Compliance & Data Protection
- GDPR compliance (data minimization, consent, right to access/deletion/portability)
- Indian data localization (all Indian user data stored in India)
- Minor protection (special protections for users under 18)
- Cross-border transfer consent
- Data retention policies (user profiles: 7y, session recordings: 2y, payments: 7y, chat logs: 1y, audit logs: 5y)
- Backup strategy (hourly DB, real-time file storage, config on change)
- Incident response plan (detection, assessment, containment, eradication, recovery, review)
- Service level: 99.9% uptime 
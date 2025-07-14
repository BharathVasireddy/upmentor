import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, 'Must include uppercase').regex(/[a-z]/, 'Must include lowercase').regex(/[0-9]/, 'Must include number').regex(/[^A-Za-z0-9]/, 'Must include special character'),
  confirmPassword: z.string(),
  primaryLanguage: z.string().min(2),
  academicLevel: z.enum(['school', 'college']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const academicDetailsSchema = z.object({
  userId: z.string().uuid(),
  academicLevel: z.enum(['school', 'college']),
  // School fields
  schoolName: z.string().optional(),
  board: z.string().optional(),
  classGrade: z.string().optional(),
  stream: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  extracurricular: z.array(z.string()).optional(),
  // College fields
  universityName: z.string().optional(),
  degreeType: z.string().optional(),
  major: z.string().optional(),
  minor: z.string().optional(),
  semester: z.number().optional(),
  cgpa: z.number().optional(),
  projects: z.array(z.string()).optional(),
  internships: z.array(z.string()).optional(),
  // Common fields
  achievements: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
  if (data.academicLevel === 'school') {
    if (!data.schoolName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'schoolName required', path: ['schoolName'] });
    if (!data.classGrade) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'classGrade required', path: ['classGrade'] });
    if (!data.subjects || data.subjects.length < 3) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least 3 subjects required', path: ['subjects'] });
  } else if (data.academicLevel === 'college') {
    if (!data.universityName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'universityName required', path: ['universityName'] });
    if (!data.degreeType) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'degreeType required', path: ['degreeType'] });
    if (!data.major) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'major required', path: ['major'] });
    if (!data.semester) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'semester required', path: ['semester'] });
    if (!data.cgpa && data.cgpa !== 0) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'cgpa required', path: ['cgpa'] });
  }
});

export const languagePreferencesSchema = z.object({
  userId: z.string().uuid(),
  primaryLanguage: z.string().min(2),
  languagesSpoken: z.array(z.string().min(2)).min(1),
});

export const careerGoalsSchema = z.object({
  userId: z.string().uuid(),
  preferredRoles: z.array(z.string().min(2)).min(1),
  targetCompanies: z.array(z.string().min(2)).optional(),
  desiredLocations: z.array(z.string().min(2)).optional(),
  workPreferences: z.string().optional(),
  careerTimeline: z.string().optional(),
  specificConcerns: z.array(z.string().min(2)).optional(),
});

export const interestsChallengesSchema = z.object({
  userId: z.string().uuid(),
  interests: z.array(z.string().min(2)).min(1),
  challenges: z.array(z.string().min(2)).optional(),
  goals: z.array(z.string().min(2)).optional(),
});

export const profileCompletionSchema = z.object({
  userId: z.string().uuid(),
  profileImage: z.string().url().optional(),
  preferences: z.array(z.string().min(2)).optional(),
  onboardingCompleted: z.boolean().optional(),
});

export const roleAssignmentSchema = z.object({
  userId: z.string().uuid(),
  roleType: z.enum(['STUDENT', 'MENTOR', 'ADMIN', 'SUPPORT']),
  permissions: z.array(z.string().min(2)).optional(),
});

import { ResumeData } from './types';

export const INITIAL_DATA: ResumeData = {
  templateId: 'modern',
  personalInfo: {
    fullName: 'Alex Carter',
    email: 'alex.carter@example.com',
    phone: '+1 (555) 000-0000',
    address: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexcarter',
    portfolio: 'alexcarter.dev',
  },
  summary: 'Dedicated Software Engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture with a focus on delivering high-performance user experiences.',
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechFlow Systems',
      location: 'Remote',
      startDate: '2021-03',
      endDate: 'Present',
      description: '- Spearheaded the transition from monolith to microservices architecture.\n- Improved application load time by 40% through code splitting and asset optimization.\n- Mentored a team of 5 junior developers.',
    },
  ],
  education: [
    {
      id: 'e1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8/4.0',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Tailwind CSS', 'GraphQL', 'Docker', 'Git'],
  projects: [
    {
      id: 'p1',
      name: 'E-Commerce Engine',
      description: 'A custom-built, headless e-commerce platform supporting multi-tenant storefronts.',
      technologies: 'Next.js, Stripe API, PostgreSQL',
    },
  ],
  certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional Developer'],
  sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'],
};

export const STORAGE_KEY = 'apex_resume_data_v1';

export const TEMPLATES = [
  { id: 'modern', name: 'Modern Minimal', description: 'Clean sans-serif typography with professional spacing.' },
  { id: 'executive', name: 'Executive Suite', description: 'Traditional hierarchy for leadership and business roles.' },
  { id: 'creative', name: 'Creative Tech', description: 'Modern sections with stronger visual emphasis.' },
  { id: 'compact', name: 'High Density', description: 'Optimized for experience-heavy resumes without clutter.' },
  { id: 'technical', name: 'Dev Focus', description: 'Structured for engineering, backend, and frontend roles.' },
  { id: 'academic', name: 'Academic CV', description: 'Formal layout for researchers and education-focused profiles.' },
  { id: 'elegant', name: 'Elegant Serif', description: 'Refined typography for polished mid-senior applications.' },
  { id: 'professional', name: 'Bold Professional', description: 'Strong section breaks for operations, finance, and HR.' },
  { id: 'minimalist', name: 'Ultra Minimal', description: 'Plain ATS-first layout focused on readability.' },
  { id: 'classic', name: 'Standard Business', description: 'Safe corporate styling for general business roles.' },
] as const;

export const ROLES = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'UI/UX Designer',
  'Digital Marketer',
  'Accountant',
  'HR Manager',
  'Sales Executive',
  'Fresher / Student',
] as const;

export const ROLE_TEMPLATES: Record<string, string[]> = {
  'Software Developer': ['technical', 'modern', 'compact'],
  'Frontend Developer': ['creative', 'modern', 'minimalist'],
  'Backend Developer': ['technical', 'compact', 'classic'],
  'Data Analyst': ['minimalist', 'professional', 'modern'],
  'UI/UX Designer': ['creative', 'elegant', 'modern'],
  'Digital Marketer': ['creative', 'professional', 'modern'],
  Accountant: ['classic', 'professional', 'minimalist'],
  'HR Manager': ['professional', 'classic', 'executive'],
  'Sales Executive': ['executive', 'professional', 'classic'],
  'Fresher / Student': ['modern', 'minimalist', 'creative'],
};

export const ROLE_SUGGESTIONS: Record<string, { jobTitle: string; skills: string[]; keywords: string[] }> = {
  'Software Developer': {
    jobTitle: 'Software Developer',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'REST APIs'],
    keywords: ['scalable systems', 'debugging', 'unit testing'],
  },
  'Frontend Developer': {
    jobTitle: 'Frontend Developer',
    skills: ['React', 'Tailwind CSS', 'TypeScript', 'Responsive Design', 'Accessibility'],
    keywords: ['UI performance', 'component systems', 'cross-browser'],
  },
  'Backend Developer': {
    jobTitle: 'Backend Developer',
    skills: ['Node.js', 'SQL', 'System Design', 'API Development', 'Caching'],
    keywords: ['distributed systems', 'database optimization', 'microservices'],
  },
  'Data Analyst': {
    jobTitle: 'Data Analyst',
    skills: ['SQL', 'Excel', 'Power BI', 'Python', 'Dashboarding'],
    keywords: ['reporting', 'data cleaning', 'trend analysis'],
  },
  'UI/UX Designer': {
    jobTitle: 'UI/UX Designer',
    skills: ['Figma', 'Wireframing', 'Design Systems', 'User Research', 'Prototyping'],
    keywords: ['usability', 'interaction design', 'design handoff'],
  },
  'Digital Marketer': {
    jobTitle: 'Digital Marketer',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content Strategy', 'Social Media'],
    keywords: ['campaign optimization', 'lead generation', 'conversion funnels'],
  },
  Accountant: {
    jobTitle: 'Accountant',
    skills: ['Financial Reporting', 'Tax Preparation', 'Excel', 'Reconciliation', 'ERP Systems'],
    keywords: ['compliance', 'ledger accuracy', 'month-end close'],
  },
  'HR Manager': {
    jobTitle: 'HR Manager',
    skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Performance Management', 'Onboarding'],
    keywords: ['policy implementation', 'talent strategy', 'retention'],
  },
  'Sales Executive': {
    jobTitle: 'Sales Executive',
    skills: ['Lead Qualification', 'CRM', 'Negotiation', 'Pipeline Management', 'Client Relations'],
    keywords: ['quota achievement', 'B2B sales', 'closing deals'],
  },
  'Fresher / Student': {
    jobTitle: 'Graduate Candidate',
    skills: ['Communication', 'Problem Solving', 'Teamwork', 'MS Office', 'Research'],
    keywords: ['internship experience', 'academic projects', 'fast learner'],
  },
};

export const getTemplatesForRole = (role?: string) => {
  const fallbackRole = ROLES[0];
  const activeRole = role && ROLE_TEMPLATES[role] ? role : fallbackRole;
  const templateIds = ROLE_TEMPLATES[activeRole] ?? ROLE_TEMPLATES[fallbackRole];
  return TEMPLATES.filter((template) => templateIds.includes(template.id));
};

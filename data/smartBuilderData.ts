import { ResumeData } from '../types';

export const SMART_ROLE_SUGGESTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'React Developer',
  'Software Engineer',
  'Data Analyst',
  'Business Analyst',
  'Digital Marketing Intern',
  'Graphic Designer',
  'Content Writer',
  'BCA Fresher',
  'BTech Student',
];

export const SMART_ROLE_SKILL_MAP: Record<string, string[]> = {
  'Frontend Developer': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Responsive Design'],
  'Backend Developer': ['Node.js', 'Express', 'SQL', 'MongoDB', 'API Integration', 'System Design'],
  'Full Stack Developer': ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Git', 'REST APIs'],
  'React Developer': ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'State Management'],
  'Software Engineer': ['Problem Solving', 'Java', 'Python', 'Git', 'Data Structures'],
  'Data Analyst': ['Excel', 'SQL', 'Power BI', 'Python', 'Data Visualization'],
  'Business Analyst': ['Excel', 'Communication', 'Stakeholder Management', 'Requirement Gathering'],
  'Digital Marketing Intern': ['SEO', 'Content Writing', 'Canva', 'Analytics', 'Communication'],
  'Graphic Designer': ['Canva', 'Figma', 'Branding', 'Visual Design', 'Presentation Skills'],
  'Content Writer': ['Content Writing', 'SEO', 'Research', 'Editing', 'Communication'],
  'BCA Fresher': ['Communication', 'JavaScript', 'HTML', 'CSS', 'Problem Solving'],
  'BTech Student': ['Problem Solving', 'Python', 'Communication', 'Git', 'Teamwork'],
};

export const SMART_SKILL_SUGGESTIONS = Array.from(new Set(Object.values(SMART_ROLE_SKILL_MAP).flat().concat([
  'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python', 'Java', 'Git', 'GitHub', 'Figma', 'Canva', 'Excel', 'Power BI', 'SEO', 'Content Writing', 'Communication', 'Problem Solving', 'Leadership', 'API Integration', 'Teamwork', 'Presentation Skills'
])));

export const SMART_EXPERIENCE_LEVELS = ['Fresher', 'Experienced'] as const;
export const SMART_QUALIFICATIONS = ['HSC (12th)', 'Diploma', "Bachelor's Degree", "Master's Degree"] as const;
export const SMART_HOBBY_SUGGESTIONS = ['Reading', 'Coding', 'Sports', 'Public Speaking', 'Music', 'Designing', 'Writing', 'Travel', 'Volunteering'];

export const SMART_DEMO_PROFILES: Record<string, ResumeData> = {
  fresher: {
    templateId: 'modern',
    personalInfo: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@email.com',
      phone: '+91 98765 43210',
      address: 'Pune, India',
      linkedin: 'linkedin.com/in/aaravsharma',
      portfolio: 'github.com/aaravsharma',
    },
    summary: 'Motivated fresher with strong communication, problem solving, and project execution skills, ready to contribute to fast-moving teams with a clean ATS-friendly resume.',
    experience: [],
    education: [
      { id: 'edu-fresher-1', degree: 'HSC (Science)', institution: 'Modern Junior College', location: 'Pune', startDate: '2022', endDate: '2023', gpa: '82%' },
      { id: 'edu-fresher-2', degree: 'BCA', institution: 'Savitribai Phule Pune University', location: 'Pune', startDate: '2023', endDate: '2026', gpa: '8.6/10' },
    ],
    skills: ['Communication', 'Problem Solving', 'MS Excel', 'Canva', 'Teamwork', 'Presentation Skills'],
    projects: [
      { id: 'proj-fresher-1', name: 'Student Resume Builder', description: 'Created a simple resume builder prototype for students to generate ATS-friendly resumes faster.', technologies: 'HTML, CSS, JavaScript' },
    ],
    certifications: ['Google Digital Skills - Google - 2025', 'Excel Basics - Coursera - 2024'],
    hobbies: ['Reading', 'Coding'],
    sectionOrder: ['summary', 'skills', 'education', 'projects', 'certifications', 'hobbies'],
  },
  developer: {
    templateId: 'technical',
    personalInfo: {
      fullName: 'Maya Patel',
      email: 'maya.patel@email.com',
      phone: '+91 99887 77665',
      address: 'Bangalore, India',
      linkedin: 'linkedin.com/in/mayapatel',
      portfolio: 'maya.dev',
    },
    summary: 'Frontend developer focused on performant interfaces, reusable component systems, and ATS-friendly product experiences that convert better.',
    experience: [
      { id: 'exp-dev-1', jobTitle: 'Frontend Developer', company: 'PixelStack Labs', location: 'Remote', startDate: '2023', endDate: 'Present', description: '- Built responsive React interfaces with reusable UI patterns and cleaner content structure.\n- Improved page speed and conversion-focused user flows across multiple product pages.' },
    ],
    education: [
      { id: 'edu-dev-1', degree: 'B.Tech in Computer Science', institution: 'VTU', location: 'Bangalore', startDate: '2019', endDate: '2023', gpa: '8.4/10' },
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'REST APIs', 'Responsive Design'],
    projects: [
      { id: 'proj-dev-1', name: 'AI Resume Builder', description: 'Developed a resume builder with live preview, guided ATS scoring, and user-friendly template flows.', technologies: 'React, TypeScript, Tailwind CSS' },
    ],
    certifications: ['Frontend Performance Masterclass - Udemy - 2024'],
    hobbies: ['Coding', 'Reading'],
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications', 'hobbies'],
  },
  student: {
    templateId: 'creative',
    personalInfo: {
      fullName: 'Neha Verma',
      email: 'neha.verma@email.com',
      phone: '+91 91234 56789',
      address: 'Delhi, India',
      linkedin: 'linkedin.com/in/nehaverma',
      portfolio: 'behance.net/nehaverma',
    },
    summary: 'Creative student with strong design thinking, communication, and presentation skills, looking for internships and entry-level opportunities.',
    experience: [],
    education: [
      { id: 'edu-student-1', degree: 'HSC (Arts)', institution: 'Delhi Public School', location: 'Delhi', startDate: '2021', endDate: '2022', gpa: '88%' },
      { id: 'edu-student-2', degree: 'B.Des', institution: 'Delhi Skill Institute', location: 'Delhi', startDate: '2022', endDate: '2026', gpa: '8.8/10' },
    ],
    skills: ['Figma', 'Canva', 'Presentation Skills', 'Communication', 'Research', 'Design Systems'],
    projects: [
      { id: 'proj-student-1', name: 'Student Portfolio Refresh', description: 'Redesigned a student portfolio concept with better typography, layout hierarchy, and recruiter-friendly presentation.', technologies: 'Figma, Canva' },
    ],
    certifications: ['UI UX Foundations - Great Learning - 2025'],
    hobbies: ['Designing', 'Music'],
    sectionOrder: ['summary', 'skills', 'education', 'projects', 'certifications', 'hobbies'],
  },
};

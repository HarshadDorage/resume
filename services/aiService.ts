
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

export async function parseResumeWithAI(text: string): Promise<ResumeData | null> {
  if (!process.env.API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Extract all resume data from the following raw text and format it into the specified JSON structure. 
    Important: Always include a "sectionOrder" array containing: ["summary", "experience", "skills", "education", "projects", "certifications"].
    
    Raw text:
    ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalInfo: {
            type: Type.OBJECT,
            properties: {
              fullName: { type: Type.STRING },
              email: { type: Type.STRING },
              phone: { type: Type.STRING },
              address: { type: Type.STRING },
              linkedin: { type: Type.STRING },
              portfolio: { type: Type.STRING },
            },
            required: ['fullName', 'email', 'phone', 'address', 'linkedin', 'portfolio']
          },
          summary: { type: Type.STRING },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                jobTitle: { type: Type.STRING },
                company: { type: Type.STRING },
                location: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ['id', 'jobTitle', 'company', 'location', 'startDate', 'endDate', 'description']
            }
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                degree: { type: Type.STRING },
                institution: { type: Type.STRING },
                location: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                gpa: { type: Type.STRING },
              },
              required: ['id', 'degree', 'institution', 'location', 'startDate', 'endDate']
            }
          },
          skills: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                technologies: { type: Type.STRING },
              },
              required: ['id', 'name', 'description', 'technologies']
            }
          },
          certifications: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          sectionOrder: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'sectionOrder']
      }
    }
  });

  try {
    const jsonStr = response.text?.trim() || "{}";
    const data = JSON.parse(jsonStr);
    
    if (data.experience) {
      data.experience = data.experience.map((e: any, i: number) => ({ ...e, id: e.id || `ai-exp-${i}` }));
    }
    if (data.education) {
      data.education = data.education.map((e: any, i: number) => ({ ...e, id: e.id || `ai-edu-${i}` }));
    }
    if (data.projects) {
      data.projects = data.projects.map((p: any, i: number) => ({ ...p, id: p.id || `ai-proj-${i}` }));
    }
    // Final safety check for sectionOrder
    if (!data.sectionOrder || data.sectionOrder.length === 0) {
      data.sectionOrder = ["summary", "experience", "skills", "education", "projects", "certifications"];
    }
    return data;
  } catch (error) {
    console.error("AI Parsing Error:", error);
    return null;
  }
}

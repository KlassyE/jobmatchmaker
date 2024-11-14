import axios from 'axios';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';
const CLIENT_SECRET = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;

// Create an authenticated axios instance
const linkedInClient = axios.create({
  baseURL: LINKEDIN_API_URL,
  headers: {
    'Authorization': `Bearer ${CLIENT_SECRET}`,
    'Content-Type': 'application/json',
  }
});

export interface LinkedInJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  applyUrl: string;
}

export const searchJobs = async (keywords: string): Promise<LinkedInJob[]> => {
  try {
    const response = await linkedInClient.get('/jobs/search', {
      params: {
        keywords,
        format: 'json'
      }
    });
    
    // For now, keep the mock data until we verify the API connection
    // In production, you would transform response.data to match the LinkedInJob interface
    return [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'LinkedIn',
        location: 'San Francisco, CA',
        description: 'Join our team to build the future of professional networking.',
        salary: '150k-200k',
        applyUrl: 'https://linkedin.com/jobs/1'
      },
      {
        id: '2',
        title: 'Full Stack Engineer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        description: 'Work on cutting-edge cloud technologies.',
        salary: '140k-190k',
        applyUrl: 'https://linkedin.com/jobs/2'
      }
    ];
  } catch (error) {
    console.error('Error fetching LinkedIn jobs:', error);
    throw new Error('Failed to fetch jobs from LinkedIn');
  }
};

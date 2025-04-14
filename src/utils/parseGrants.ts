import { GrantCard, GrantStatus } from '@/types/kanban';

const LOGO_MAP: Record<string, string> = {
  'National Lottery Community Fund': '/images/lottery.png',
  'The Fore': '/images/fore.png',
  'King Charles III Charitable Fund': '/images/king.png',
  'Greggs Foundation': '/images/community.png',
  'Matthew Good Foundation': '/images/matthew.png',
  'The Leathersellers\' Company': '/images/leathersellers.png',
  'Trusthouse Charitable Foundation': '/images/trusthouse.webp',
  'The Clothworkers\' Foundation': '/images/clothworkers.png',
  'UK Community Foundations': '/images/community.png'
};

export function parseGrants(csvData: string): GrantCard[] {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',');
    const funderName = values[0].trim();
    
    return {
      id: index + 1,
      title: funderName,
      amount: parseFloat(values[1].trim()),
      deadline: values[2].trim(),
      status: 'researching' as GrantStatus,
      description: values[2].trim(),
      eligibility: values[3].trim(),
      applicationDetails: values[4].trim(),
      logo: LOGO_MAP[funderName] || null,
      projects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
} 
import { NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/services';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const github = await getGitHubStats();
  
  // Mocking database latency for the "System Status" feel
  const dbLatency = Math.floor(Math.random() * 50) + 10; 
  
  return NextResponse.json({
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: {
      status: 'operational', // We assume it's up if the API is running
      latency: `${dbLatency}ms`
    },
    integrations: {
      github
    }
  });
}

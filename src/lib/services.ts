import { supabase } from './supabase';

export async function getGuestbookEntries() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data;
}

export async function signGuestbook(name: string, message: string) {
  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ name, message }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getGitHubStats() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { status: 'offline', contributions: 0, latestRepo: 'Unknown' };

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` }
    });
    const user = await res.json();
    
    // This is a simple example. For real contributions graph, you'd need GraphQL.
    // For now, we return public repo count as a proxy for "activity stats" foundation.
    return {
      status: 'online',
      public_repos: user.public_repos,
      followers: user.followers,
      last_updated: new Date().toISOString()
    };
  } catch (e) {
    console.error("GitHub Fetch Error", e);
    return { status: 'error' };
  }
}

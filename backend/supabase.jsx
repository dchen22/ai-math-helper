import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Supabase
export async function initializeSupabase() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('Supabase initialized successfully');
    return session;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    throw error;
  }
}

// Example function to save math problem analysis
export async function saveMathProblemAnalysis(problem, analysis) {
  try {
    const { data, error } = await supabase
      .from('math_problems')
      .insert([{
        problem_text: problem,
        analysis: analysis,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving math problem analysis:', error);
    throw error;
  }
}

// Example function to get analysis history
export async function getAnalysisHistory(userId) {
  try {
    const { data, error } = await supabase
      .from('math_problems')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    throw error;
  }
}

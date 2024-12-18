import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const getSupabaseClient = (customToken?: string) => {
  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: customToken 
        ? { Authorization: `Bearer ${customToken}` }
        : undefined
    },
  };

  return createClient(supabaseUrl, supabaseAnonKey, options);
};

// Default client for unauthenticated requests
export const supabase = getSupabaseClient();

// Test the connection immediately
// console.log("Testing Supabase connection...");
// (async () => {
//   try {
//     const { error } = await supabase.from("teams").select("*").limit(1);
//     if (error) {
//       console.error("Supabase connection error:", error);
//     } else {
//       console.log("Supabase connection successful, received data:");
//     }
//   } catch (err) {
//     console.error("Supabase connection threw error:", err);
//   }
// })();

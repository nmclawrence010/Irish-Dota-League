import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Initializing Supabase with:", {
  url: supabaseUrl ? "exists" : "missing",
  key: supabaseAnonKey ? "exists" : "missing",
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: "public",
  },
});

// Test the connection immediately
console.log("Testing Supabase connection...");
(async () => {
  try {
    const { error } = await supabase.from("teams").select("*").limit(1);
    if (error) {
      console.error("Supabase connection error:", error);
    } else {
      console.log("Supabase connection successful, received data:");
    }
  } catch (err) {
    console.error("Supabase connection threw error:", err);
  }
})();

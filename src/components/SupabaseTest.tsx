import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const SupabaseTest = () => {
  const [status, setStatus] = useState<string>("Testing...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from("teams").select("*").limit(1);

        if (error) {
          console.error("Test query error:", error);
          setStatus(`Error: ${error.message}`);
          return;
        }

        console.log("Test query result:", data);
        setStatus("Connection successful!");
      } catch (err) {
        console.error("Test error:", err);
        setStatus(`Catch error: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3>Supabase Connection Status:</h3>
      <p>{status}</p>
    </div>
  );
};

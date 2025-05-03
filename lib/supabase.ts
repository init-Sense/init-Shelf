import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vvewfpwmkcynwuifrjge.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZXdmcHdta2N5bnd1aWZyamdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTgyOTYsImV4cCI6MjA1OTc3NDI5Nn0.4eZihA1UzVvFzNoEouh5peeTmefQsyZwJ42W-KQkXQI";

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase URL or Anon Key");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

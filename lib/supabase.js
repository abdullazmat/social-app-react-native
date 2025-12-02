import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrlKey } from "../constants";

const supabaseUrl = supabaseUrlKey;
const supabasePublishableKey = supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

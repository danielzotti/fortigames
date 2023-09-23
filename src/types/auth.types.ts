import { User } from "@supabase/gotrue-js/src/lib/types";

export interface JwtToken {
  provider_token: string;
  access_token: string;
  expires_in: number; // 3600,
  expires_at: number; //  Must be multiplied for 1000,
  refresh_token: string;
  token_type: string;
  user: User;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string
          email: string
          firstname: string | null
          id: number
          is_admin: boolean
          is_facilitator: boolean
          is_playing_boardgames: boolean
          is_playing_pingpong: boolean
          is_playing_soccer: boolean
          is_playing_volley: boolean
          is_referee: boolean
          lastname: string | null
        }
        Insert: {
          created_at?: string
          email: string
          firstname?: string | null
          id?: number
          is_admin?: boolean
          is_facilitator?: boolean
          is_playing_boardgames?: boolean
          is_playing_pingpong?: boolean
          is_playing_soccer?: boolean
          is_playing_volley?: boolean
          is_referee?: boolean
          lastname?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          firstname?: string | null
          id?: number
          is_admin?: boolean
          is_facilitator?: boolean
          is_playing_boardgames?: boolean
          is_playing_pingpong?: boolean
          is_playing_soccer?: boolean
          is_playing_volley?: boolean
          is_referee?: boolean
          lastname?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

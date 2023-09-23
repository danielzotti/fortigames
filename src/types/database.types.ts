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
          company: string | null
          email: string
          firstname: string | null
          has_filled_form: boolean
          id: number
          is_admin: boolean | null
          is_facilitator: boolean | null
          is_playing_boardgames: boolean | null
          is_playing_pingpong: boolean | null
          is_playing_soccer: boolean | null
          is_playing_volley: boolean | null
          is_referee: boolean | null
          lastname: string | null
          number: number | null
          team: string | null
        }
        Insert: {
          company?: string | null
          email: string
          firstname?: string | null
          has_filled_form?: boolean
          id?: number
          is_admin?: boolean | null
          is_facilitator?: boolean | null
          is_playing_boardgames?: boolean | null
          is_playing_pingpong?: boolean | null
          is_playing_soccer?: boolean | null
          is_playing_volley?: boolean | null
          is_referee?: boolean | null
          lastname?: string | null
          number?: number | null
          team?: string | null
        }
        Update: {
          company?: string | null
          email?: string
          firstname?: string | null
          has_filled_form?: boolean
          id?: number
          is_admin?: boolean | null
          is_facilitator?: boolean | null
          is_playing_boardgames?: boolean | null
          is_playing_pingpong?: boolean | null
          is_playing_soccer?: boolean | null
          is_playing_volley?: boolean | null
          is_referee?: boolean | null
          lastname?: string | null
          number?: number | null
          team?: string | null
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

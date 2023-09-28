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
      agenda: {
        Row: {
          activity: string | null
          day: number | null
          end: string | null
          id: number
          start: string | null
        }
        Insert: {
          activity?: string | null
          day?: number | null
          end?: string | null
          id?: number
          start?: string | null
        }
        Update: {
          activity?: string | null
          day?: number | null
          end?: string | null
          id?: number
          start?: string | null
        }
        Relationships: []
      }
      config: {
        Row: {
          games_ended_at: string | null
          games_started_at: string | null
          id: number
          is_paused: boolean | null
          planned_end: string | null
          planned_start: string | null
          winner: string | null
        }
        Insert: {
          games_ended_at?: string | null
          games_started_at?: string | null
          id?: number
          is_paused?: boolean | null
          planned_end?: string | null
          planned_start?: string | null
          winner?: string | null
        }
        Update: {
          games_ended_at?: string | null
          games_started_at?: string | null
          id?: number
          is_paused?: boolean | null
          planned_end?: string | null
          planned_start?: string | null
          winner?: string | null
        }
        Relationships: []
      }
      games_results: {
        Row: {
          dragons: number
          id: number
          last_update: string | null
          name: string | null
          tigers: number
        }
        Insert: {
          dragons?: number
          id?: number
          last_update?: string | null
          name?: string | null
          tigers?: number
        }
        Update: {
          dragons?: number
          id?: number
          last_update?: string | null
          name?: string | null
          tigers?: number
        }
        Relationships: []
      }
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

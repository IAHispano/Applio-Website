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
      models: {
        Row: {
          id: number
          image_url: string | null
          link: string
          name: string
        }
        Insert: {
          id: number
          image_url?: string | null
          link: string
          name: string
        }
        Update: {
          id?: number
          image_url?: string | null
          link?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          username?: string | null
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

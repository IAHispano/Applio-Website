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
          created_at: string
          epochs: string
          id: number
          image_url: string
          link: string
          name: string
          user_id: string
          version: string
        }
        Insert: {
          created_at?: string
          epochs: string
          id?: number
          image_url: string
          link: string
          name: string
          user_id: string
          version: string
        }
        Update: {
          created_at?: string
          epochs?: string
          id?: number
          image_url?: string
          link?: string
          name?: string
          user_id?: string
          version?: string
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

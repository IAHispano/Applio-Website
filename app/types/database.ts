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
      blog: {
        Row: {
          by: string
          content: string
          created_at: string
          id: number
          image_url: string
          title: string
        }
        Insert: {
          by: string
          content: string
          created_at?: string
          id?: number
          image_url: string
          title: string
        }
        Update: {
          by?: string
          content?: string
          created_at?: string
          id?: number
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      models: {
        Row: {
          algorithm: string | null
          author_id: string
          author_username: string | null
          created_at: string | null
          epochs: string | null
          id: string
          image_url: string | null
          link: string | null
          name: string | null
          type: string | null
        }
        Insert: {
          algorithm?: string | null
          author_id: string
          created_at?: string | null
          epochs?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          name?: string | null
          type?: string | null
        }
        Update: {
          algorithm?: string | null
          author_id?: string
          created_at?: string | null
          epochs?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          auth_id: string | null
          avatar_url: string
          bio: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
          links: Array<any | null>
        }
        Insert: {
          auth_id?: string | null
          avatar_url: string
          bio?: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
          links: Array<any | null>
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string
          bio?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          halloween?: string
          links: Array<any | null>
        }
        Relationships: [
          {
            foreignKeyName: "profiles_auth_id_fkey"
            columns: ["auth_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
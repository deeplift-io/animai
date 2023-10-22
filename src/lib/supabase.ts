export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      animals: {
        Row: {
          age: number | null
          avatar_url: string | null
          breed: string | null
          created_at: string | null
          id: string
          name: string
          profile_id: string
          seed_prompt: string | null
          type: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          breed?: string | null
          created_at?: string | null
          id?: string
          name: string
          profile_id: string
          seed_prompt?: string | null
          type?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          breed?: string | null
          created_at?: string | null
          id?: string
          name?: string
          profile_id?: string
          seed_prompt?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "animals_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
        Row: {
          advanced_settings: Json | null
          created_at: string | null
          history_type: string | null
          id: string
          model: string | null
          owner: string | null
          system_prompt: string | null
          title: string | null
        }
        Insert: {
          advanced_settings?: Json | null
          created_at?: string | null
          history_type?: string | null
          id?: string
          model?: string | null
          owner?: string | null
          system_prompt?: string | null
          title?: string | null
        }
        Update: {
          advanced_settings?: Json | null
          created_at?: string | null
          history_type?: string | null
          id?: string
          model?: string | null
          owner?: string | null
          system_prompt?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_owner_fkey"
            columns: ["owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          conversation: string | null
          created_at: string | null
          embedding: string | null
          id: number
          owner: string | null
          role: string | null
          token_size: number | null
        }
        Insert: {
          content?: string | null
          conversation?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          owner?: string | null
          role?: string | null
          token_size?: number | null
        }
        Update: {
          content?: string | null
          conversation?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          owner?: string | null
          role?: string | null
          token_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_fkey"
            columns: ["conversation"]
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_owner_fkey"
            columns: ["owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          fingerprint_id: string | null
          id: string
          name: string | null
          onboarded_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          fingerprint_id?: string | null
          id: string
          name?: string | null
          onboarded_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          fingerprint_id?: string | null
          id?: string
          name?: string | null
          onboarded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      visitors: {
        Row: {
          conversation_blob: Json[] | null
          created_at: string | null
          fingerprint_id: string | null
          id: number
          message_allowance: number
        }
        Insert: {
          conversation_blob?: Json[] | null
          created_at?: string | null
          fingerprint_id?: string | null
          id?: number
          message_allowance?: number
        }
        Update: {
          conversation_blob?: Json[] | null
          created_at?: string | null
          fingerprint_id?: string | null
          id?: number
          message_allowance?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


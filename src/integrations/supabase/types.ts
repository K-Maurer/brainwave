export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adaptive_learning_goals: {
        Row: {
          adjustment_factor: number
          created_at: string
          current_target: number
          document_id: string
          goal_type: string
          id: string
          initial_target: number
          last_adjustment: string | null
          user_id: string
        }
        Insert: {
          adjustment_factor?: number
          created_at?: string
          current_target: number
          document_id: string
          goal_type: string
          id?: string
          initial_target: number
          last_adjustment?: string | null
          user_id: string
        }
        Update: {
          adjustment_factor?: number
          created_at?: string
          current_target?: number
          document_id?: string
          goal_type?: string
          id?: string
          initial_target?: number
          last_adjustment?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adaptive_learning_goals_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_generated_content: {
        Row: {
          content: Json
          content_type: string
          created_at: string
          document_id: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: Json
          content_type: string
          created_at?: string
          document_id?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          content_type?: string
          created_at?: string
          document_id?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generated_content_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_milestones: {
        Row: {
          achieved_at: string
          celebrated: boolean
          document_id: string
          id: string
          views_milestone: number
        }
        Insert: {
          achieved_at?: string
          celebrated?: boolean
          document_id: string
          id?: string
          views_milestone: number
        }
        Update: {
          achieved_at?: string
          celebrated?: boolean
          document_id?: string
          id?: string
          views_milestone?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_milestones_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_shares: {
        Row: {
          created_at: string
          document_id: string | null
          expires_at: string | null
          group_id: string | null
          id: string
          permission_level: string | null
          shared_by: string | null
          shared_with: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          expires_at?: string | null
          group_id?: string | null
          id?: string
          permission_level?: string | null
          shared_by?: string | null
          shared_with?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          expires_at?: string | null
          group_id?: string | null
          id?: string
          permission_level?: string | null
          shared_by?: string | null
          shared_with?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_shares_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_shares_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_shares_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_shares_shared_with_fkey"
            columns: ["shared_with"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          file_path: string
          file_type: string
          id: string
          last_viewed_at: string | null
          learning_type: string | null
          owner_id: string | null
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          file_path: string
          file_type: string
          id?: string
          last_viewed_at?: string | null
          learning_type?: string | null
          owner_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          file_path?: string
          file_type?: string
          id?: string
          last_viewed_at?: string | null
          learning_type?: string | null
          owner_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dynamic_learning_milestones: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          current_value: number | null
          document_id: string
          id: string
          milestone_type: string
          target_value: number
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_value?: number | null
          document_id: string
          id?: string
          milestone_type: string
          target_value: number
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_value?: number | null
          document_id?: string
          id?: string
          milestone_type?: string
          target_value?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dynamic_learning_milestones_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          joined_at: string
          role: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string
          role?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_analytics: {
        Row: {
          comprehension_score: number | null
          focus_score: number | null
          id: string
          learning_style: string | null
          session_duration: number
          session_timestamp: string
          user_id: string
        }
        Insert: {
          comprehension_score?: number | null
          focus_score?: number | null
          id?: string
          learning_style?: string | null
          session_duration?: number
          session_timestamp?: string
          user_id: string
        }
        Update: {
          comprehension_score?: number | null
          focus_score?: number | null
          id?: string
          learning_style?: string | null
          session_duration?: number
          session_timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      learning_goals: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          priority: number | null
          status: string | null
          target_date: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          priority?: number | null
          status?: string | null
          target_date?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          priority?: number | null
          status?: string | null
          target_date?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      learning_metrics: {
        Row: {
          created_at: string | null
          document_id: string | null
          focus_score: number | null
          id: string
          last_interaction: string | null
          revision_count: number | null
          study_time_minutes: number | null
          understanding_level: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          focus_score?: number | null
          id?: string
          last_interaction?: string | null
          revision_count?: number | null
          study_time_minutes?: number | null
          understanding_level?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          focus_score?: number | null
          id?: string
          last_interaction?: string | null
          revision_count?: number | null
          study_time_minutes?: number | null
          understanding_level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_metrics_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_path_documents: {
        Row: {
          document_id: string
          learning_path_id: string
          sequence_order: number
        }
        Insert: {
          document_id: string
          learning_path_id: string
          sequence_order: number
        }
        Update: {
          document_id?: string
          learning_path_id?: string
          sequence_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_documents_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          estimated_duration_hours: number | null
          id: string
          prerequisites: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration_hours?: number | null
          id?: string
          prerequisites?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration_hours?: number | null
          id?: string
          prerequisites?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          comprehension_level: number | null
          created_at: string
          document_id: string | null
          id: string
          last_studied_at: string | null
          notes: string | null
          progress_percentage: number | null
          study_time_minutes: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          comprehension_level?: number | null
          created_at?: string
          document_id?: string | null
          id?: string
          last_studied_at?: string | null
          notes?: string | null
          progress_percentage?: number | null
          study_time_minutes?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          comprehension_level?: number | null
          created_at?: string
          document_id?: string | null
          id?: string
          last_studied_at?: string | null
          notes?: string | null
          progress_percentage?: number | null
          study_time_minutes?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_progress_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          daily_goal_completed: boolean | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          motivation_score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          daily_goal_completed?: boolean | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          motivation_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          daily_goal_completed?: boolean | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          motivation_score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          learning_preferences: Json | null
          learning_style: Json | null
          subscription_status: string | null
          subscription_type: string | null
          subscription_valid_until: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          learning_preferences?: Json | null
          learning_style?: Json | null
          subscription_status?: string | null
          subscription_type?: string | null
          subscription_valid_until?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          learning_preferences?: Json | null
          learning_style?: Json | null
          subscription_status?: string | null
          subscription_type?: string | null
          subscription_valid_until?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          completion_percentage: number | null
          created_at: string
          document_id: string | null
          id: string
          last_accessed: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completion_percentage?: number | null
          created_at?: string
          document_id?: string | null
          id?: string
          last_accessed?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completion_percentage?: number | null
          created_at?: string
          document_id?: string | null
          id?: string
          last_accessed?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_private: boolean | null
          max_members: number | null
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          max_members?: number | null
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          max_members?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_groups_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_notes: {
        Row: {
          content: string
          created_at: string | null
          document_id: string | null
          id: string
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          document_id?: string | null
          id?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          document_id?: string | null
          id?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_notes_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_counter: {
        Args: {
          row_id: string
        }
        Returns: number
      }
      search_documents: {
        Args: {
          search_query?: string
          category_filter?: string
          difficulty_filter?: string
          learning_type_filter?: string
          tag_filter?: string[]
        }
        Returns: {
          id: string
          title: string
          description: string
          file_path: string
          file_type: string
          created_at: string
          category: string
          tags: string[]
          learning_type: string
          difficulty_level: string
          view_count: number
          last_viewed_at: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

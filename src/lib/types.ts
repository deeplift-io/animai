export type Animal = Database['public']['Tables']['animals']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Visitor = Database['public']['Tables']['visitors']['Row'];
export interface AnimalWithProfile extends Animal {
    profiles: Profile;
}
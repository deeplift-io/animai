export type Animal = Database['public']['Tables']['animals']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export interface AnimalWithProfile extends Animal {
    profiles: Profile;
}
export type Animal = Database['public']['Tables']['animals']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export interface AnimalWithProfile extends Animal {
    profiles: Profile;
}
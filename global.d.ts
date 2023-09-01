import { Database as DB } from "./src/lib/supabase";

declare global {
    type Database = DB;
}
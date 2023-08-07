import { Database as DB } from "./lib/supabase";

declare global {
    type Database = DB;
}
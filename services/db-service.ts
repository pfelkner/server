import { createClient } from "@supabase/supabase-js";
import { Database } from "../api/supabase";

export type UserEntity = Database["public"]["Tables"]["User"]["Row"];
export type ScoreEntity = Database["public"]["Tables"]["Score"]["Row"];

const supabase = createClient<Database>(
  "https://ahpnipoaaigjjhgaglyp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocG5pcG9hYWlnampoZ2FnbHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1OTI5MzIsImV4cCI6MjAyNjE2ODkzMn0.imfhz8Ip_pJGDPB9W_t5hPO1w-nDRf9u5nyB0Gvuc4M"
);

export const getUsers = async (): Promise<UserEntity[]> => {
  const { data, error } = await supabase.from("User").select();

  if (error) {
    console.error("getUsers:Error fetching data:", error);
    throw error;
  }
  return data;
};

// TODO: write generic helper function to get user by field (handle error, get first element) xx

export const getUserById = async (id: number): Promise<any> => {
  const { data, error } = await supabase.from("User").select().eq("id", id);

  if (error || data.length != 1) throw error;
  return data[0];
};

export const getUserByName = async (name: string): Promise<any> => {
  const { data, error } = await supabase.from("User").select().eq("name", name);
  if (error || data.length != 1) throw error;
  return data[0];
};

export const createUser = async (
  name: string,
  password: string
): Promise<any> => {
  const { data: userData, error: userError } = await supabase
    .from("User")
    .insert([{ name, password }]);

  if (userError || !userData) throw userError;
  const newUser: UserEntity = userData[0];
  const { data: scoreData, error: scoreError } = await supabase
    .from("Score")
    .insert([{ userId: newUser.id, highestStreak: 0 }]);

  if (scoreError) throw scoreError;
};

export const getScores = async (): Promise<ScoreEntity[]> => {
  const { data, error } = await supabase.from("Score").select();
  if (error) throw error;

  return data;
};

export const getPlayerScore = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from("Score")
      .select()
      .eq("userId", userId);
    if (error || data.length != 1) throw error;
    return data[0];
  } catch (error) {
    console.error("getPlayerScore:Error fetching data:", error);
    throw error;
  }
};

export const updatePlayerScore = async (
  userId: number,
  newScore: number
): Promise<void> => {
  console.log("update:", userId, newScore);
  try {
    const { data, error } = await supabase
      .from("Score")
      .update({ highestStreak: newScore })
      .eq("userId", userId);

    if (error) throw error;
    // if (!data) throw new Error("No data returned from update operation");

    // return data[0];
  } catch (error) {
    console.error("updatePlayerScore:Error fetching data:", error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const { data, error } = await supabase.from("Country").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("getCountries:Error fetching data:", error);
    // throw error;
  }
};

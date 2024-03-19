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

// function genericTest<T>(a: T, b: V): T {
//   return await supabase.from(a).select().eq(b, b);
// }
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
  try {
    const { data: userData, error: userError } = await supabase
      .from("User")
      .insert([{ name, password }]);

    if (userError) throw userError;
    const newUser = (await supabase.from("User").select().eq("name", name))
      .data![0];
    const { data: scoreData, error: scoreError } = await supabase
      .from("Score")
      .insert([{ userId: newUser.id, highestStreak: 0 }]);

    if (scoreError) throw scoreError;
  } catch (error) {
    console.error("createUser:Error fetching data:", error);
  }
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
  }
};

export const insertGame = async (table: string, game: any) => {
  try {
    const { data, error } = await supabase.from(table).insert([
      {
        userId: game.userId,
        answers: game.answers,
        accuracy: game.accuracy,
        lives: game.lives,
        currentStreak: game.currentStreak,
      },
    ]);
    if (error) throw error;
  } catch (error) {
    console.error(`insertGame:Error inserting data into ${table}`, error);
  }
};

export const createGame = async (game: any) => {
  await insertGame("CurrentGame", game);
};

export const archiveGame = async (game: any) => {
  try {
    const { data, error } = await supabase.from("Test").insert([
      {
        userId: game.userId,
        answers: game.answers,
        accuracy: game.accuracy,
      },
    ]);
    if (error) throw error;
    removeCurrentGame(game.userId);
  } catch (error) {
    console.error("archiveGame:Error fetching data:", error);
  }
};

export const removeCurrentGame = async (userId: string) => {
  try {
    await supabase.from("CurrentGame").delete().eq("userId", userId);
  } catch (error) {
    console.error("removeCurrentGame:Error fetching data:", error);
  }
};

export const updateGame = async (game: any) => {
  try {
    const { data, error } = await supabase
      .from("CurrentGame")
      .update({
        answers: game.answers,
        accuracy: game.accuracy,
        lives: game.lives,
        currentStreak: game.currentStreak,
      })
      .eq("userId", game.userId);
    if (error) throw error;
  } catch (error) {
    console.error("updateGame:Error fetching data:", error);
  }
};

export const saveGame = async (currentGame: any) => {
  try {
    const currentGames = await supabase.from("CurrentGame").select();
    const hasCurrentGame = await currentGames.data?.find(
      (cg) => cg.userId === currentGame.userId
    );
    console.log("Saving curretn game".repeat(20));
    console.log(currentGame);
    console.log("Saving curretn game".repeat(20));
    let saveGame = {
      ...currentGame,
      updatedAt: new Date(),
    };

    console.log("savegame:", saveGame);
    if (!hasCurrentGame) {
      await createGame(currentGame);
    } else {
      if (currentGame.lives < 1) await archiveGame(currentGame);
      else await updateGame(currentGame);
    }
  } catch (error) {
    console.error("saveGame:Error fetching data:", error);
  }
};

export const getCurrentGame = async (userId: string) => {
  console.log("getting current game for user: ", userId);
  try {
    const currentGame: any = await supabase
      .from("CurrentGame")
      .select()
      .eq("userId", userId);

    return currentGame.data[0];
  } catch (error) {
    console.error("getCurrentGame:Error fetching data:", error);
  }
};

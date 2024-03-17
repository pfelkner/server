"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerScore = exports.getPlayerScore = exports.getScores = exports.createUser = exports.getUserByName = exports.getUserById = exports.getUsers = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)("https://ahpnipoaaigjjhgaglyp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocG5pcG9hYWlnampoZ2FnbHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1OTI5MzIsImV4cCI6MjAyNjE2ODkzMn0.imfhz8Ip_pJGDPB9W_t5hPO1w-nDRf9u5nyB0Gvuc4M");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from("User").select();
    if (error) {
        console.error("getUsers:Error fetching data:", error);
        throw error;
    }
    return data;
});
exports.getUsers = getUsers;
// TODO: write generic helper function to get user by field (handle error, get first element)
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from("User").select().eq("id", id);
    if (error || data.length != 1)
        throw error;
    return data[0];
});
exports.getUserById = getUserById;
const getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from("User").select().eq("name", name);
    if (error || data.length != 1)
        throw error;
    return data[0];
});
exports.getUserByName = getUserByName;
const createUser = (name, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: userData, error: userError } = yield supabase
        .from("User")
        .insert([{ name, password }]);
    if (userError || !userData)
        throw userError;
    const newUser = userData[0];
    const { data: scoreData, error: scoreError } = yield supabase
        .from("Score")
        .insert([{ userId: newUser.id, highestStreak: 0 }]);
    if (scoreError)
        throw scoreError;
});
exports.createUser = createUser;
const getScores = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.from("Score").select();
    if (error)
        throw error;
    return data;
});
exports.getScores = getScores;
const getPlayerScore = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from("Score")
            .select()
            .eq("userId", userId);
        if (error || data.length != 1)
            throw error;
        return data[0];
    }
    catch (error) {
        console.error("getPlayerScore:Error fetching data:", error);
        throw error;
    }
});
exports.getPlayerScore = getPlayerScore;
const updatePlayerScore = (userId, newScore) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update:", userId, newScore);
    try {
        const { data, error } = yield supabase
            .from("Score")
            .update({ highestStreak: newScore })
            .eq("userId", userId);
        if (error)
            throw error;
        // if (!data) throw new Error("No data returned from update operation");
        // return data[0];
    }
    catch (error) {
        console.error("updatePlayerScore:Error fetching data:", error);
        throw error;
    }
});
exports.updatePlayerScore = updatePlayerScore;

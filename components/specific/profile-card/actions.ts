"use server";

import { getSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { UsersRow } from "@/lib/supabase/types";
import { getUser } from "@/lib/userActions";
import { cookies } from "next/headers";

export const editAvatar = async (fdata: FormData) => {
  const supabase = getSupabase();

  const user = await getUser();
  if (!user) throw new Error("User not logged in.");
  const avatar = fdata.get("avatar");

  if (!avatar) return;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`${user.id}/profile`, avatar, { upsert: true });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
};

export const editDetails = async (
  newdata: Omit<Partial<UsersRow>, "role" | "club_id">
) => {
  const supabase = getSupabase();
  const user = await getUser();

  if (!user) throw new Error("No user");
  const { error } = await supabase
    .from("users")
    .update({ ...newdata })
    .eq("id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
};

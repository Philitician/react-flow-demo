"use server";

import { revalidatePath } from "next/cache";

export const revalidateBlueprints = async () => {
  revalidatePath("/");
};

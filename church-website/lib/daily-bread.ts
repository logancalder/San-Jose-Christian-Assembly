import { DateTime } from "luxon";
import { supabase } from "@/lib/supabase"; // your DB client

export async function getDailyBreadBatch() {
  const today = DateTime.now().setZone('America/Los_Angeles');

  const dates = Array.from({ length: 5 }).map((_, i) =>
    today.plus({ days: i }).toFormat("yyyy-MM-dd")
  );

  const results = await supabase.daily_bread.findMany({
    where: {
      date: {
        in: dates,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      verses: true,
      verses_zh: true,
    },
  });

  return results;
}

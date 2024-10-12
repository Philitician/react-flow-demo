import Link from "next/link";
import { Suspense } from "react";

import { db } from "@/db/client";
import { drawing } from "@/db/schemas";
import { BlueprintUploader } from "./_components/blueprint-uploader";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <h2>Manage Blueprints</h2>
      <BlueprintUploader />
      <Suspense fallback={<div>Loading...</div>}>
        <Blueprints />
      </Suspense>
    </main>
  );
}

async function Blueprints() {
  const drawings = await db.select().from(drawing);
  return (
    <div className="flex flex-col gap-2">
      {drawings.map((drawing) => (
        <Link key={drawing.id} href={`/drawing/${drawing.id}`}>
          {drawing.title}
        </Link>
      ))}
    </div>
  );
}

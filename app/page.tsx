import { Suspense } from "react";
import Link from "next/link";
import { list } from "@vercel/blob";

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
  const files = await list();
  return (
    <div className="flex flex-col gap-2">
      {files.blobs.map((file) => (
        <Link href={`/board?blueprintUrl=${encodeURI(file.url)}`}>
          {file.pathname}
        </Link>
      ))}
    </div>
  );
}

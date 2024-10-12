"use client";

import {
  FileUploader,
  LoadingFile,
  Uploaded,
  UploaderFile,
} from "@/components/file-uploader";
import { upload } from "@vercel/blob/client";
import { useCallback, useState } from "react";
import { createDrawing } from "./actions";

export function BlueprintUploader() {
  const [files, setFiles] = useState<UploaderFile[]>([]);
  const handleUpload = useCallback(async ([file]: LoadingFile[]) => {
    const blob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    await createDrawing({
      blueprintUrl: blob.url,
      title: blob.pathname,
    });
    return null;
  }, []);
  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      multiple={false}
      maxFiles={1}
      onUpload={handleUpload}
    />
  );
}

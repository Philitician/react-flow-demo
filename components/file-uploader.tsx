"use client";

import type { DropzoneProps, FileRejection } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { customAlphabet } from "nanoid";
import { useDropzone } from "react-dropzone";
import { match } from "ts-pattern";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useControllableState } from "@/hooks/use-controllable-state";
import { cn } from "@/lib/utils";

const genId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 28);

function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 2, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  const formattedValue = value.toFixed(decimals);
  const unit = sizeType === "accurate" ? accurateSizes[i] : sizes[i];

  // Remove trailing zeros and decimal point if not needed
  return `${parseFloat(formattedValue)} ${unit ?? "Bytes"}`;
}

// export type FileName = Pick<File, "name">;
export type FileName = { fileName: string };

export type Loading = FileName & { status: "Loading" };
export type Failed = FileName & { status: "Failed"; errorMessage: string };
export type Scanning = FileName & { id: number; status: "Scanning" };
export type Uploaded = FileName & { id: number; status: "Uploaded" };
export type Malware = FileName & {
  id: number;
  status: "Malware";
  errorMessage: string;
};

export type ServerUploadResult = Failed | Scanning | Uploaded;

export type LoadingFile = File & Omit<Loading, "fileName">;
export type ScanningFile = File & Omit<Scanning, "fileName">;
export type UploadedFile = File & Omit<Uploaded, "fileName">;
export type MalwareFile = File & Omit<Malware, "fileName">;

export type UploaderFile =
  | LoadingFile
  | ScanningFile
  | UploadedFile
  | MalwareFile;

export type RemovedFile = { id: number };

type ErrorMessage = {
  id: string;
  message: string;
  createdAt: number;
};

type FileUploaderProps = {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: UploaderFile[];

  /**
   * Function to be called when the value changes.
   * @type (files: File[]) => void
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: (files: UploaderFile[]) => void;

  /**
   * Function to be called when files are uploaded.
   * @type (files: UploaderFile[]) => Promise<UploaderFile[]>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: LoadingFile[]) => Promise<ServerUploadResult[] | null>;

  /**
   * Function to be called when a file is removed.
   * @type (file: UploaderFile) => Promise<void>
   * @default undefined
   * @example onRemove={async (file) => console.log("file removed: ", file.name)}
   */
  onRemove?: (file: RemovedFile) => Promise<void>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={{ "image/*": ["png", "jpeg"] }}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={4}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  showPreview?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function FileUploader({
  value,
  onValueChange,
  onUpload,
  onRemove,
  accept = { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
  maxSize = 4 * 1024 * 1024, // 4MB
  maxFiles = 1,
  multiple = false,
  ...dropzoneProps
}: FileUploaderProps) {
  const [files, setFiles] = useControllableState<UploaderFile[]>({
    prop: value,
    onChange: onValueChange,
    defaultProp: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessage[]>([]);

  const addError = useCallback((message: string) => {
    const newError: ErrorMessage = {
      id: `${Date.now()}-${message}`,
      message,
      createdAt: Date.now(),
    };
    setErrors((prevErrors) => [...prevErrors, newError]);
  }, []);

  const removeError = useCallback((id: string) => {
    setErrors((prevErrors) => prevErrors.filter((error) => error.id !== id));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setErrors((prevErrors) =>
        prevErrors.filter((error) => Date.now() - error.createdAt < 3000)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUpload = useCallback(
    async (allFiles: UploaderFile[], loadingFiles: LoadingFile[]) => {
      if (!onUpload || loadingFiles.length === 0) return;

      setIsUploading(true);
      try {
        const processedFiles = await onUpload(loadingFiles);

        // Handle null return from onUpload
        if (processedFiles === null) {
          setFiles([]);
          return;
        }

        const failedFiles = processedFiles.filter((f) => f.status === "Failed");
        failedFiles.forEach((f) =>
          addError(`${f.fileName}: ${f.errorMessage}`)
        );
        const nonFailedProcessedFiles = processedFiles.filter(
          (f) => f.status !== "Failed"
        );

        const newFiles = allFiles
          .map((f) => {
            if (failedFiles.some((ff) => ff.fileName === f.name)) return;
            const processedFile = nonFailedProcessedFiles.find(
              (fk) => fk.fileName === f.name
            );
            if (!processedFile) return f;
            return Object.assign(f, {
              status: processedFile.status,
              id: processedFile.id,
            });
          })
          .filter(Boolean);

        setFiles(newFiles);
      } catch (error: any) {
        console.log("error", error);
        addError(error.message);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload, setFiles, addError]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        addError("Kan ikke laste opp mer enn 1 fil samtidig");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        addError(`Kan ikke laste opp mer enn ${maxFiles} filer`);
        return;
      }

      const newFiles: LoadingFile[] = acceptedFiles.map((file) => {
        const fileName = `${genId()}.${file.name.split(".").pop()}`;
        const newFile = new File([file], fileName, {
          type: file.type,
          lastModified: file.lastModified,
        });
        return Object.assign(newFile, {
          status: "Loading" as const,
          preview: URL.createObjectURL(newFile),
        });
      });

      setFiles((prevFiles) => {
        const allFiles = [...(prevFiles ?? []), ...newFiles];
        void handleUpload(allFiles, newFiles);
        return allFiles;
      });

      rejectedFiles.forEach((rejection) => {
        const fileName = rejection.file.name;
        const message = match(rejection.errors[0]?.code)
          .with(
            "file-too-large",
            () => `${fileName} overskrider maksgrensen per fil.`
          )
          .with(
            "file-invalid-type",
            () => `${fileName} er ikke i et gyldig filformat.`
          )
          .otherwise(
            () => "Det har dessverre skjedd en feil, prøv igjen senere."
          );
        addError(message);
      });
    },
    [files, maxFiles, multiple, setFiles, addError, handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple,
  });

  // Revoke preview url when component unmounts
  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div
        {...getRootProps()}
        {...dropzoneProps}
        className={cn(
          "cursor-pointer border-2 border-dashed border-primary px-6 py-4 text-center transition-colors hover:border-solid",
          {
            "bg-subtle": isDragActive,
            "pointer-events-none opacity-50": isUploading,
          }
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <div className="space-y-3">
          <Upload className="mx-auto h-7 w-7 text-icon" />
          <div className="space-y-0.5">
            <p className="font-medium">
              {isUploading ? (
                "Laster opp..."
              ) : (
                <>
                  Klikk for å <span className="underline">laste opp</span>,
                  eller dra inn filer her.
                </>
              )}
            </p>
            <p className="text-muted">
              Gyldig filformat:{" "}
              {Object.values(accept).flat().join(", ").replaceAll(".", "")}.
              Maks per fil: {formatBytes(maxSize)}.
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <ErrorMessages errors={errors} removeError={removeError} />
      )}

      {files && files.length > 0 && (
        <ScrollArea className="h-fit w-full">
          <ul className="space-y-3">
            {files.map((file) => (
              <FileCard
                key={file.name}
                file={file}
                isUploading={isUploading}
                onRemove={() => {
                  const newFiles = files.filter((f) => f.name !== file.name);
                  const removedFile = files.find((f) => f.name === file.name);
                  if (removedFile && removedFile.status !== "Loading")
                    void onRemove?.(removedFile);
                  setFiles(newFiles);
                  onValueChange?.(newFiles);
                }}
              />
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}

type ErrorMessagesProps = {
  errors: ErrorMessage[];
  removeError: (id: string) => void;
};

function ErrorMessages({ errors, removeError }: ErrorMessagesProps) {
  return (
    <div className="space-y-3">
      {errors.map((error) => (
        <div
          key={error.message}
          className="relative rounded-md bg-error-muted-active p-4 pr-8"
        >
          {error.message}
          <Button
            onClick={() => removeError(error.id)}
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1"
          >
            <X size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
}

type FileCardProps = {
  file: UploaderFile;
  onRemove: () => void;
  isUploading: boolean;
};

function FileCard({ file, onRemove, isUploading }: FileCardProps) {
  return (
    <li className="flex items-center justify-between bg-variant-graatone p-2">
      {match(file)
        .with({ status: "Loading" }, (file) => <LoadingFileCard file={file} />)
        .with({ status: "Scanning" }, (file) => (
          <ScanningFileCard
            file={file}
            onRemove={onRemove}
            canRemove={!isUploading}
          />
        ))
        .with({ status: "Uploaded" }, (file) => (
          <UploadedFileCard
            file={file}
            onRemove={onRemove}
            canRemove={!isUploading}
          />
        ))
        .with({ status: "Malware" }, (file) => (
          <MalwareFileCard
            file={file}
            onRemove={onRemove}
            canRemove={!isUploading}
          />
        ))
        .exhaustive()}
    </li>
  );
}

function LoadingFileCard({ file }: { file: LoadingFile }) {
  return (
    <div className="flex min-w-0 flex-grow items-center gap-2">
      <LoadingSpinner className="h-6 w-6 shrink-0" />
      {isFileWithPreview(file) && <FilePreview file={file} />}
      <div className="flex min-w-0 flex-col">
        <p className="truncate">{file.name}</p>
        <p className="text-muted">{formatBytes(file.size)}</p>
      </div>
    </div>
  );
}

function ScanningFileCard({
  file,
  onRemove,
  canRemove,
}: {
  file: ScanningFile;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <>
      <div className="flex min-w-0 flex-grow items-center gap-2">
        <LoadingSpinner className="h-6 w-6 shrink-0" />
        {isFileWithPreview(file) && <FilePreview file={file} />}
        <div className="flex min-w-0 flex-col">
          <p className="truncate">{file.name}</p>
          <p className="text-muted">{formatBytes(file.size)}</p>
        </div>
      </div>
      {canRemove && (
        <Button
          onClick={onRemove}
          size="icon"
          variant="ghost"
          className="shrink-0"
        >
          <Trash2 size={20} className="text-icon" />
        </Button>
      )}
    </>
  );
}

function UploadedFileCard({
  file,
  onRemove,
  canRemove,
}: {
  file: UploadedFile;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <>
      <div className="flex min-w-0 flex-grow items-center gap-2">
        <CheckCircle size={24} className="shrink-0 text-icon-success" />
        {isFileWithPreview(file) && <FilePreview file={file} />}
        <div className="flex min-w-0 flex-col">
          <p className="truncate">{file.name}</p>
          <p className="text-muted">{formatBytes(file.size)}</p>
        </div>
      </div>
      {canRemove && (
        <Button
          onClick={onRemove}
          size="icon"
          variant="ghost"
          className="shrink-0"
        >
          <Trash2 size={20} className="text-icon" />
        </Button>
      )}
    </>
  );
}

function MalwareFileCard({
  file,
  onRemove,
  canRemove,
}: {
  file: MalwareFile;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <>
      <div className="flex min-w-0 flex-grow items-center gap-2">
        <AlertTriangle
          size={24}
          className="shrink-0 self-start text-icon-error"
        />
        <div className="flex min-w-0 flex-col">
          <p className="truncate">{file.name}</p>
          <p className="text-error">{file.errorMessage}</p>
        </div>
      </div>
      {canRemove && (
        <Button
          onClick={onRemove}
          size="icon"
          variant="ghost"
          className="shrink-0"
        >
          <Trash2 size={20} className="text-icon" />
        </Button>
      )}
    </>
  );
}

const isFileWithPreview = (file: File): file is File & { preview: string } =>
  "preview" in file && typeof file.preview === "string";

type FilePreviewProps = {
  file: File & { preview: string };
};

function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith("image/")) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }
  return <FileText className="size-10 text-muted" aria-hidden="true" />;
}

type FileInfo = (Scanning | Uploaded | Malware) & {
  fileUrl: string;
};

export const createLocalImage = async ({
  fileUrl,
  fileName,
  ...rest
}: FileInfo) => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const fileExtension = fileName.split(".").pop() ?? "*";
  const file = new File([blob], fileName, {
    type: `image/${fileExtension}`,
  });
  const preview = URL.createObjectURL(blob);
  return Object.assign(file, { preview, ...rest });
};

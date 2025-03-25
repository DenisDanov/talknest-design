
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: FileList) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, className }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);
  
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFilesSelected(e.dataTransfer.files);
      }
    },
    [onFilesSelected]
  );
  
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesSelected(e.target.files);
      }
    },
    [onFilesSelected]
  );
  
  return (
    <div
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        isDragActive ? "scale-105" : "scale-100",
        className
      )}
    >
      <label
        htmlFor="file-upload"
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm text-gray-500 outline-none transition-colors hover:bg-gray-50 hover:text-gray-700",
          isDragActive && "border-primary bg-primary/5 text-primary"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>Upload files</span>
      </label>
      <input
        type="file"
        id="file-upload"
        multiple
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;

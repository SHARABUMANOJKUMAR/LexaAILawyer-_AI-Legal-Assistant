import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  disabled?: boolean;
}

const FileUpload = ({ onFileSelect, onFileRemove, selectedFile, disabled }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (50KB limit for optimal AI processing)
      const maxSize = 50 * 1024; // 50KB
      if (file.size > maxSize) {
        alert("File size must be less than 50KB for optimal AI analysis. Please upload a smaller document or extract key sections.");
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        disabled={disabled}
      />
      
      {selectedFile ? (
        <div className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{selectedFile.name}</span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onFileRemove}
            className="h-6 w-6"
            disabled={disabled}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          title="Upload document (PDF, DOC, DOCX, TXT)"
        >
          <Upload className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default FileUpload;

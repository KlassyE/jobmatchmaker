import { useState } from "react";
import { Upload } from "lucide-react";

interface ResumeUploadProps {
  onUploadSuccess: () => void;
}

export const ResumeUpload = ({ onUploadSuccess }: ResumeUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files && files[0]) {
      setFile(files[0]);
      onUploadSuccess();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      onUploadSuccess();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div
        className={`glass-card rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging ? "border-primary border-2" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop your resume here or click to browse
        </p>
        <input
          type="file"
          id="resume-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <label
          htmlFor="resume-upload"
          className="inline-block px-6 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors duration-300"
        >
          Browse Files
        </label>
        {file && (
          <div className="mt-4 text-sm text-success">
            {file.name} successfully uploaded
          </div>
        )}
      </div>
    </div>
  );
};
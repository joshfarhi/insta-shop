import React from 'react';
import { FileUpload } from "@/components/ui/file-upload";

const DragAndDrop = ({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) => {
  return (
    <FileUpload onChange={onFilesSelected} />
  );
};

export default DragAndDrop;
import React, { useState, useRef, useEffect } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const DragAndDrop = ({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    onFilesSelected(droppedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    onFilesSelected(selectedFiles);
  };

  useEffect(() => {
    fileInputRef.current?.setAttribute('webkitdirectory', 'true');
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className="border-dashed border-4 border-gray-400 p-8 rounded-lg text-center bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg cursor-pointer"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center h-32">
        <FiUploadCloud className="text-4xl text-gray-500 dark:text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Drag and drop your folders and images here</p>
        <p className="text-gray-500 dark:text-gray-400">or click to select files</p>
      </div>
    </div>
  );
};

export default DragAndDrop;
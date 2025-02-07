"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";

export default function Home() {
  const [categoryName, setCategoryName] = useState("");
  const [pricePoint, setPricePoint] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Process the form data and generate CSV for WooCommerce
    console.log("Category Name:", categoryName);
    console.log("Price Point:", pricePoint);
    console.log("Images:", images);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-dark-blue text-white font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-lg">
        <div>
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Insta-Shop logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to Insta-Shop
        </h1>
        <p className="text-lg text-center sm:text-left">
          Easily import your catalog to CSV format for WooCommerce.
        </p>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Import Your Catalog</CardTitle>
            <CardDescription>Fill in the details below to generate your CSV file.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <Label className="flex flex-col gap-2">
                Category Name
                <Input
                  type="text"
                  value={categoryName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
                  className="p-2 rounded bg-white text-black"
                  required
                />
              </Label>
              <Label className="flex flex-col gap-2">
                Price Point
                <Input
                  type="number"
                  value={pricePoint}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPricePoint(e.target.value)}
                  className="p-2 rounded bg-white text-black"
                  required
                />
              </Label>
              <Label className="flex flex-col gap-2">
                Upload Images
                <div
                  {...getRootProps()}
                  className={`p-4 border-2 border-dashed rounded cursor-pointer ${
                    isDragActive ? "border-blue-600" : "border-gray-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-center">Drop the files here...</p>
                  ) : (
                    <p className="text-center">Drag & drop some files here, or click to select files</p>
                  )}
                </div>
              </Label>
              <Button type="submit" className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import DragAndDrop from "./components/DragAndDrop";
import { CardDemo } from "@/app/components/CardDemo";
import CollapsibleBox from "@/app/components/CollapsableBox";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  showToast,
} from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [csvData, setCsvData] = useState<string>("");
  const [isFieldsGenerated, setIsFieldsGenerated] = useState(false);
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEachItem, setEditEachItem] = useState(false);
  const [isFileUploadVisible, setIsFileUploadVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleFiles = (uploadedFiles: File[]) => {
    const imageFiles = uploadedFiles.filter((file) => file.type.startsWith("image/"));
    setFiles(imageFiles);

    const csvContent = imageFiles
      .map((file, index) => {
        const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const fileType = file.type;
        const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert size to MB
        return `${index + 1},${itemName},${fileType},${fileSize}`;
      })
      .join("\n");

    setCsvData(`Index,Item Name,File Type,File Size\n${csvContent}`);
    setIsFieldsGenerated(false); // Reset fields generated state
    setIsFileUploadVisible(false); // Hide the file upload component

    // Show toast message
    showToast(`${imageFiles.length} files imported successfully.`);
  };

  const generateFields = () => {
    // Simulate field generation
    setTimeout(() => {
      setIsFieldsGenerated(true);
      const details = files.reduce((acc: { [key: string]: any }, file) => {
        const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        acc[itemName] = {
          price: "",
          shortDescription: "",
          quantity: "",
          sku: generateSKU(itemName),
          itemName: itemName,
        };
        return acc;
      }, {});
      setItemDetails(details);
      // Set a default selected item if one doesn't exist
      const firstItemName = files[0]?.name.replace(/\.[^/.]+$/, "");
      setSelectedItem(details[firstItemName] || null);
      setIsModalOpen(true);
    }, 1000);
  };

  const generateSKU = (itemName: string) => {
    return `${itemName}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleDetailChange = (itemName: string, field: string, value: string) => {
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [itemName]: {
        ...prevDetails[itemName],
        [field]: value,
      },
    }));
  };

  const downloadCsv = () => {
    const csvContent = files
      .map((file, index) => {
        const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const details = itemDetails[itemName];
        return `${index + 1},${details.itemName},${details.sku},${details.price},${details.quantity},${details.shortDescription}`;
      })
      .join("\n");

    const csvHeader = "Index,Item Name,SKU,Price,Quantity,Short Description\n";
    const blob = new Blob([csvHeader + csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleEditChoice = (choice: boolean) => {
    setEditEachItem(choice);
    setIsModalOpen(true);
  };

  const handleRestart = () => {
    setFiles([]);
    setCsvData("");
    setIsFieldsGenerated(false);
    setItemDetails({});
    setIsModalOpen(false);
    setEditEachItem(false);
    setIsFileUploadVisible(true); // Show the file upload component
  };

  const clearFiles = () => {
    setFiles([]);
    setIsFileUploadVisible(true); // Show the file upload component
  };

  const handleCardClick = (itemName: string) => {
    setSelectedItem(itemDetails[itemName]);
    setIsModalOpen(true);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-black text-[#E0E0E0]">
        <main className="flex flex-col items-center justify-center p-8 sm:p-20">
          <motion.img
            src="/instashop.png"
            alt="InstaShop Logo"
            className="w-64 h-64 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          {isFileUploadVisible && <DragAndDrop onFilesSelected={handleFiles} />}
          {files.length > 0 && (
            <div className="w-full mt-8">
              <CollapsibleBox title="Generated Inventory" onClear={clearFiles}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                  {files.map((file, index) => {
                    const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
                    const fileType = file.type;
                    const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert size to MB
                    return (
                      <CardDemo
                        key={index}
                        itemName={itemName}
                        fileType={fileType}
                        fileSize={parseFloat(fileSize)}
                        index={index}
                        onClick={() => handleCardClick(itemName)}
                      />
                    );
                  })}
                </div>
              </CollapsibleBox>
            </div>
          )}
        </main>
        <footer className="flex gap-6 flex-wrap items-center justify-center text-[#E0E0E0] mt-8">
          <p>Created with love and good vibes from Joshua Farhi ©2025</p>
        </footer>

        {isModalOpen && selectedItem && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="bg-[#1F1F1F] text-white">
            <DialogHeader>
        <DialogTitle>Category Product 1</DialogTitle>
        <DialogClose />
            </DialogHeader>
            <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            {selectedItem.itemName}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">
          Price
              </label>
              <input
          type="text"
          value={selectedItem.price}
          onChange={(e) =>
            handleDetailChange(
              selectedItem.itemName,
              "price",
              e.target.value
            )
          }
          className="mt-1 p-2 rounded border border-white bg-[#1F1F1F] text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
          Short Description
              </label>
              <input
          type="text"
          value={selectedItem.shortDescription}
          onChange={(e) =>
            handleDetailChange(
              selectedItem.itemName,
              "shortDescription",
              e.target.value
            )
          }
          className="mt-1 p-2 rounded border border-white bg-[#1F1F1F] text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
          Quantity
              </label>
              <input
          type="text"
          value={selectedItem.quantity}
          onChange={(e) =>
            handleDetailChange(
              selectedItem.itemName,
              "quantity",
              e.target.value
            )
          }
          className="mt-1 p-2 rounded border border-white bg-[#1F1F1F] text-white w-full"
              />
            </div>
          </div>
        </div>
            </div>
            <DialogFooter>
        <button
          onClick={() => {
            setSelectedItem(itemDetails[selectedItem.itemName]);
            closeModal();
          }}
          className="px-3 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          Save Changes
        </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
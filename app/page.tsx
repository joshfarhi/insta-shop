"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import DragAndDrop from "./components/DragAndDrop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [csvData, setCsvData] = useState<string>("");
  const [isFieldsGenerated, setIsFieldsGenerated] = useState(false);
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEachItem, setEditEachItem] = useState(false);

  const handleFiles = (uploadedFiles: File[]) => {
    const imageFiles = uploadedFiles.filter((file) => file.type.startsWith("image/"));
    setFiles(imageFiles);

    const csvContent = imageFiles
      .map((file) => {
        const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const fileType = file.type;
        const fileSize = file.size;
        return `${itemName},${fileType},${fileSize}`;
      })
      .join("\n");

    setCsvData(`Item Name,File Type,File Size\n${csvContent}`);
    setIsFieldsGenerated(false); // Reset fields generated state
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
      .map((file) => {
        const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const details = itemDetails[itemName];
        return `${details.itemName},${details.sku},${details.price},${details.quantity},${details.shortDescription}`;
      })
      .join("\n");

    const csvHeader = "Item Name,SKU,Price,Quantity,Short Description\n";
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
  };

  return (
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
        <DragAndDrop onFilesSelected={handleFiles} />
        {files.length > 0 && (
          <div className="w-full mt-8">
            <p className="text-green-500 flex items-center">
              {files.length} files imported successfully.
            </p>
            <div className="bg-[#1E1E1E] bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mt-8">
              <div className="flex justify-between items-center cursor-pointer">
                <h2 className="text-lg font-semibold text-[#E0E0E0]">Uploaded Files</h2>
              </div>
              <div className="mt-4">
                <ul className="list-disc list-inside text-[#E0E0E0] mt-4 space-y-2">
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={generateFields}
              className="mt-4 px-3 py-1 bg-[#BB86FC] text-[#121212] rounded shadow hover:bg-[#3700B3]"
            >
              Generate Fields
            </button>
          </div>
        )}
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center text-[#E0E0E0] mt-8">
        <p>Created with love and good vibes from Joshua Farhi ©2025</p>
      </footer>

      {isFieldsGenerated && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item Details</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogBody>
              <div className="mb-4">
                <p>Would you like to edit each item specifically or set the same details for all items?</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEditChoice(true)}
                    className="px-3 py-1 bg-[#BB86FC] text-[#121212] rounded shadow hover:bg-[#3700B3]"
                  >
                    Edit Each Item
                  </button>
                  <button
                    onClick={() => handleEditChoice(false)}
                    className="px-3 py-1 bg-[#BB86FC] text-[#121212] rounded shadow hover:bg-[#3700B3]"
                  >
                    Set Same Details for All
                  </button>
                </div>
              </div>
              {editEachItem ? (
                <div className="max-h-96 overflow-y-auto">
                  {files.map((file, index) => {
                    const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
                    const details = itemDetails[itemName];
                    return (
                      <div key={index} className="mb-4 p-4 bg-[#1E1E1E] rounded-lg">
                        <h3 className="text-lg font-semibold text-[#E0E0E0] mb-2">{itemName}</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[#E0E0E0]">Price</label>
                            <input
                              type="text"
                              value={details.price}
                              onChange={(e) => handleDetailChange(itemName, "price", e.target.value)}
                              className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#E0E0E0]">Short Description</label>
                            <input
                              type="text"
                              value={details.shortDescription}
                              onChange={(e) => handleDetailChange(itemName, "shortDescription", e.target.value)}
                              className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#E0E0E0]">Quantity</label>
                            <input
                              type="text"
                              value={details.quantity}
                              onChange={(e) => handleDetailChange(itemName, "quantity", e.target.value)}
                              className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#E0E0E0]">Item Name</label>
                            <input
                              type="text"
                              value={details.itemName}
                              onChange={(e) => handleDetailChange(itemName, "itemName", e.target.value)}
                              className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#E0E0E0]">SKU</label>
                            <input
                              type="text"
                              value={details.sku}
                              readOnly
                              className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-[#1E1E1E] rounded-lg">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#E0E0E0]">Price</label>
                      <input
                        type="text"
                        onChange={(e) => handleDetailChange("all", "price", e.target.value)}
                        className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E0E0E0]">Short Description</label>
                      <input
                        type="text"
                        onChange={(e) => handleDetailChange("all", "shortDescription", e.target.value)}
                        className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E0E0E0]">Quantity</label>
                      <input
                        type="text"
                        onChange={(e) => handleDetailChange("all", "quantity", e.target.value)}
                        className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E0E0E0]">Item Name</label>
                      <input
                        type="text"
                        onChange={(e) => handleDetailChange("all", "itemName", e.target.value)}
                        className="mt-1 p-2 rounded border border-[#BB86FC] bg-[#121212] text-[#E0E0E0] w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </DialogBody>
            <DialogFooter>
              <button
                onClick={downloadCsv}
                className="mt-4 px-3 py-1 bg-[#BB86FC] text-[#121212] rounded shadow hover:bg-[#3700B3]"
              >
                Download CSV
              </button>
              <button
                onClick={handleRestart}
                className="mt-4 px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-700"
              >
                Restart
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
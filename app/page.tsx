"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DragAndDrop from "./components/DragAndDrop";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiChevronDown, FiChevronUp, FiCheckCircle } from "react-icons/fi";
import Modal from "./components/Modal";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [csvData, setCsvData] = useState<string>("");
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isFieldsGenerated, setIsFieldsGenerated] = useState(false);
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEachItem, setEditEachItem] = useState(false);

  const handleFiles = (uploadedFiles: File[]) => {
    const imageFiles = uploadedFiles.filter(file => file.type.startsWith("image/"));
    setFiles(imageFiles);

    const csvContent = imageFiles.map(file => {
      const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      const fileType = file.type;
      const fileSize = file.size;
      return `${itemName},${fileType},${fileSize}`;
    }).join("\n");

    setCsvData(`Item Name,File Type,File Size\n${csvContent}`);
    setIsCardOpen(true);
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
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [itemName]: {
        ...prevDetails[itemName],
        [field]: value,
      },
    }));
  };

  const downloadCsv = () => {
    const csvContent = files.map(file => {
      const itemName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      const details = itemDetails[itemName];
      return `${details.itemName},${details.sku},${details.price},${details.quantity},${details.shortDescription}`;
    }).join("\n");

    const csvHeader = "Item Name,SKU,Price,Quantity,Short Description\n";
    const blob = new Blob([csvHeader + csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditChoice = (choice: boolean) => {
    setEditEachItem(choice);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center p-8 sm:p-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8"
        >
          Insta-Shop
        </motion.h1>
        <DragAndDrop onFilesSelected={handleFiles} />
        {files.length > 0 && (
          <Card className="w-full bg-gray-800 dark:bg-gray-700 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mt-8">
            <CardHeader className="flex justify-between items-center cursor-pointer" onClick={toggleCard}>
              <CardTitle className="text-lg font-semibold text-gray-100">Uploaded Files</CardTitle>
              <span>{isCardOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </CardHeader>
            <CardContent>
              <p className="text-green-500 flex items-center">
                <FiCheckCircle className="mr-2" />
                {files.length} files imported successfully. Initial item generation complete.
              </p>
            </CardContent>
            <AnimatePresence>
              {isCardOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <ul className="list-disc list-inside text-black-500 mt-4 space-y-2">
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                    <button
                      onClick={generateFields}
                      className="mt-4 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                    >
                      Generate Fields
                    </button>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        )}
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center text-gray-700 dark:text-gray-300 mt-8">
        <p>Happy organizing with Insta-Shop!</p>
      </footer>

      {isFieldsGenerated && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Item Details</h2>
            <div className="mb-4">
              <p>Would you like to edit each item specifically or set the same details for all items?</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEditChoice(true)}
                  className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                  Edit Each Item
                </button>
                <button
                  onClick={() => handleEditChoice(false)}
                  className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
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
                    <div key={index} className="mb-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{itemName}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Price"
                          value={details.price}
                          onChange={(e) => handleDetailChange(itemName, "price", e.target.value)}
                          className="p-2 rounded border border-gray-300 dark:border-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Short Description"
                          value={details.shortDescription}
                          onChange={(e) => handleDetailChange(itemName, "shortDescription", e.target.value)}
                          className="p-2 rounded border border-gray-300 dark:border-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Quantity"
                          value={details.quantity}
                          onChange={(e) => handleDetailChange(itemName, "quantity", e.target.value)}
                          className="p-2 rounded border border-gray-300 dark:border-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Item Name"
                          value={details.itemName}
                          onChange={(e) => handleDetailChange(itemName, "itemName", e.target.value)}
                          className="p-2 rounded border border-gray-300 dark:border-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="SKU"
                          value={details.sku}
                          readOnly
                          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Price"
                    onChange={(e) => handleDetailChange("all", "price", e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Short Description"
                    onChange={(e) => handleDetailChange("all", "shortDescription", e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    onChange={(e) => handleDetailChange("all", "quantity", e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Item Name"
                    onChange={(e) => handleDetailChange("all", "itemName", e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>
            )}
            <button
              onClick={downloadCsv}
              className="mt-4 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              Download CSV
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";

interface CollapsibleBoxProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleBox = ({ title, children }: CollapsibleBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-2 bg-[#BB86FC] text-[#121212] rounded-t-lg shadow hover:bg-[#3700B3] text-left flex justify-between items-center"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default CollapsibleBox;
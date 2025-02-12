import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleBoxProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleBox = ({ title, children }: CollapsibleBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      layout
      className="max-w-md mx-auto my-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
    >
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center px-4 py-3 bg-blue-400 dark:bg-blue-700 text-gray-800 dark:text-gray-100 hover:bg-blue-500 dark:hover:bg-blue-800 focus:outline-none"
      >
        <span className="font-medium">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-3 text-gray-700 dark:text-gray-300"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollapsibleBox;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // adjust the import path as needed

interface CollapsibleBoxProps {
  title: string;
  children: React.ReactNode;
  onClear: () => void;
}

const CollapsibleBox = ({ title, children, onClear }: CollapsibleBoxProps) => {
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
            {/* Instructional hint */}
            <p className="text-xs text-gray-500 mb-2">
              Click directly on an item to edit.
            </p>
            {children}
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => {
                  if (confirm("Are you sure you want to clear?")) {
                    onClear();
                  }
                }}
                className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
              >
                <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <span className="relative z-20">Clear</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollapsibleBox;
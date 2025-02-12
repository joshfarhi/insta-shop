import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // adjust the import path as needed

interface CollapsibleBoxProps {
  title: string;
  children: React.ReactNode;
  onGenerate: () => void;
  onClear: () => void;
}

const CollapsibleBox = ({ title, children, onGenerate, onClear }: CollapsibleBoxProps) => {
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
            <div className="flex gap-4 mt-4">
              <button
                onClick={onGenerate}
                className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                  <span>Edit Product Details</span>
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
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
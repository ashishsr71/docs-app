import { ReactNode } from "react";
import { useDropdown } from "./DropdownMenu";
import { motion } from "framer-motion";

interface DropdownContentProps {
  children: ReactNode;
}

export const DropdownContent: React.FC<DropdownContentProps> = ({ children }) => {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute left-77 top-10 z-50 mt-1 w-max min-w-[150px] rounded-md bg-white shadow-lg border border-gray-200"
    >
        
      {children}
      
    </motion.div>
  );
};

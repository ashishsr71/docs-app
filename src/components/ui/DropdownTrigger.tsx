import { ReactNode } from "react";
import { useDropdown } from "./DropdownMenu";

interface DropdownTriggerProps {
  children: ReactNode;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useDropdown();

  return (
    <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className=" px-2 py-2 bg-gray-200  "
    >
      {children}
      
    </button></div>
  );
};

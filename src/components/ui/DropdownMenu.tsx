import { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react";

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownMenu");
  }
  return context;
};

interface DropdownMenuProps {
  children: ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div   ref={dropdownRef}>
        
        {children}
        </div>
      
    </DropdownContext.Provider>
  );
};

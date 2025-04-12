import * as Dailog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

// Dialog Root
export const Dialog = Dailog.Root;

// Dialog Trigger (Button to Open)
export const DialogTrigger = Dailog.Trigger;

// Dialog Content
export const DialogContent = ({ children }: { children: ReactNode }) => (
  <Dailog.Portal>
    <Dailog.Overlay className="fixed inset-0 bg-black/50" />
    <Dailog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      {children}
      <Dailog.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <X className="w-5 h-5" />
      </Dailog.Close>
    </Dailog.Content>
  </Dailog.Portal>
);

// Dialog Header
export const DialogHeader = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">{children}</div>
);

// Dialog Title
export const DialogTitle = ({ children }: { children: ReactNode }) => (
  <Dailog.Title className="text-lg font-semibold">{children}</Dailog.Title>
);

// Dialog Footer
export const DialogFooter = ({ children }: { children: ReactNode }) => (
  <div className="mt-4 flex justify-end gap-2">{children}</div>
);

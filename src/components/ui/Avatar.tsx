import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface AvatarProps {
  src?: string|undefined;
  alt?: string|undefined;
  size?: "sm" | "md" | "lg";
  fallbackText?: string;
  className?: string;
  notifications?: number;
  notificationList?: any[]; 
  t?:boolean// Optional list of messages
  cb?:(id:string|undefined)=>void,

}

const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-md",
  lg: "w-16 h-16 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "sm",
  fallbackText = "?",
  className = "",
  notifications = 1,
  notificationList = [],
  t=true,
  cb,

}) => {
  const sizeClasses = sizeMap[size];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="relative mr-2 cursor-pointer">
          <div
            className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 overflow-hidden ${sizeClasses} ${className}`}
          >
            {src ? (
              <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
              <span>{fallbackText}</span>
            )}
          </div>

          {notifications > 0 && t&&(
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {notifications}
            </div>
          )}
        </div>
      </DropdownMenu.Trigger>

      {t&&<> <DropdownMenu.Content
        className="bg-white rounded-md shadow-lg p-2 w-64 border z-50"
        sideOffset={5}
      >
       {notificationList.length > 0 ? (
          notificationList.map((item, idx) => (
            <DropdownMenu.Item
              key={idx}
              className="text-sm px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              invite from {item?.org?.name}
              <div className="hover:text-blue-500"
              onClick={()=>{if(cb)cb(item?.org?.orgId)}}
              >accept</div>
            </DropdownMenu.Item>
          ))
        ) : (
          <DropdownMenu.Item className="text-sm px-3 py-2 text-gray-500">
            No new notifications
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content> </>}
    </DropdownMenu.Root>
  );
};

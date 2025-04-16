import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell } from "lucide-react";
import { useState } from "react";





export default function Notification() {
    const {inboxNotifications}=useInboxNotifications();
  const [unreadCount, setUnreadCount] = useState(inboxNotifications.length);

  const handleOpenChange = (open: boolean) => {
    if (open) setUnreadCount(0); 
  };

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[240px] bg-white shadow-xl rounded-md p-2 border z-50"
          sideOffset={8}
        >
          <h3 className="text-sm font-medium text-gray-700 px-2 pb-1">
            Notifications
          </h3>
          <div className="max-h-60 overflow-y-auto">
            {inboxNotifications.length === 0 ? (
              <div className="text-sm text-gray-500 px-2 py-1">No new notifications</div>
            ) : (
                <InboxNotificationList>
           {inboxNotifications.map((inboxNotification)=>(
            <InboxNotification 
            key={inboxNotification.id}
            inboxNotification={inboxNotification}
            />
           ))}
                </InboxNotificationList>
            //   notifications.map((n) => (
            //     <DropdownMenu.Item
            //       key={n.id}
            //       className="text-sm px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
            //     >
            //       {n.text}
            //     </DropdownMenu.Item>
            //   ))
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}



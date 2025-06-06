import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  children,
  className = "w-64 md:w-72 lg:w-80", // Responsive width
}) => {
  console.log("Rendering Sidebar with title:", title);
  return (
    <aside className={`hidden md:block h-full ${className} border-r border-gray-200 p-4 space-y-4`}>
      {title && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <Separator className="my-3" />
        </>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height based on surrounding layout */}
        <div className="space-y-6">
          {children ? children : <p className="text-gray-500">Sidebar content goes here.</p>}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
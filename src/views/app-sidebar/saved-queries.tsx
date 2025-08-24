import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import React from "react";

function SavedQueries(): React.JSX.Element {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
  ];
  return (
    <>
      <SidebarGroupLabel>Saved Queries</SidebarGroupLabel>
      <ScrollArea className='w-full rounded-md'>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>{item.title}</SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
    </>
  );
}

export default SavedQueries;

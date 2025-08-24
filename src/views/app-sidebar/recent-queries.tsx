import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";

function RecentQueries(): React.JSX.Element {
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
  ];

  return (
    <>
      <SidebarGroupLabel>Recent Queries</SidebarGroupLabel>
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

export default RecentQueries;

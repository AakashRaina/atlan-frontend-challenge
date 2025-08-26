import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarGroupLabel, useSidebar } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import useAppStore from "@/store";
import { Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

function SavedQueries(): React.JSX.Element {
  const recentQueries = useAppStore((state) => state.recentQueries);
  const savedQueries = recentQueries.filter((query) => query.isFavorite);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();

  const handleSavedQueryDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    queryId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(queryId);
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarGroupLabel>Saved Queries</SidebarGroupLabel>
      <ScrollArea className='w-full rounded-md max-h-52'>
        <SidebarMenu>
          {savedQueries.map((query) => (
            <SidebarMenuItem key={query.id} className='flex justify-between'>
              <SidebarMenuButton
                onClick={() => {
                  navigate(`/${query.id}`);
                  setOpenMobile(false);
                }}
                className='justify-between'
              >
                {query.name || "Untitled"}
              </SidebarMenuButton>
              <Trash
                className='w-4 h-4'
                onClick={(e) => {
                  handleSavedQueryDelete(e, query.id);
                }}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
    </>
  );
}

export default SavedQueries;

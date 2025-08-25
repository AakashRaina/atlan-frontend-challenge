import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import useAppStore, { Query } from "@/store";
import { useNavigate } from "react-router";
import { Trash } from "lucide-react";

function RecentQueries(): React.JSX.Element {
  const recentQueries = useAppStore((state) => state.recentQueries);
  const removeFromRecentQueries = useAppStore(
    (state) => state.removeFromRecentQueries
  );
  const navigate = useNavigate();

  return (
    <>
      <SidebarGroupLabel>Recent Queries</SidebarGroupLabel>
      <ScrollArea className='w-full rounded-md'>
        <SidebarMenu>
          {recentQueries.map((query: Query) => (
            <SidebarMenuItem key={query.id} className='flex justify-between'>
              <SidebarMenuButton
                onClick={() => {
                  navigate(`/${query.id}`);
                }}
                className='justify-between'
              >
                {query.name || query.id || "Untitled"}
                <Trash
                  className='w-4 h-4'
                  onClick={() => {
                    removeFromRecentQueries(query.id);
                    navigate("/");
                  }}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
    </>
  );
}

export default RecentQueries;

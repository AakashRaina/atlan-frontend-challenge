import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  useSidebar,
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
  const { setOpenMobile } = useSidebar();

  const handleRemoveQuery = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    queryId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromRecentQueries(queryId);
    navigate("/");
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarGroupLabel>Recent Queries</SidebarGroupLabel>
      <ScrollArea className='w-full rounded-md max-h-52'>
        <SidebarMenu>
          {recentQueries.map((query: Query) => (
            <SidebarMenuItem key={query.id} className='flex justify-between'>
              <SidebarMenuButton
                onClick={() => {
                  navigate(`/${query.id}`);
                  setOpenMobile(false);
                }}
                className='justify-between'
              >
                {query.name || "Untitled"}
                <Trash
                  className='w-4 h-4'
                  onClick={(e) => {
                    handleRemoveQuery(e, query.id);
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

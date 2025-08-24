import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DataSource from "./data-source";
import RecentQueries from "./recent-queries";
import SavedQueries from "./saved-queries";

function AppSidebar(): React.JSX.Element {
  return (
    <Sidebar collapsible='offcanvas'>
      <SidebarContent>
        <SidebarGroup>
          <DataSource />
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <RecentQueries />
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SavedQueries />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;

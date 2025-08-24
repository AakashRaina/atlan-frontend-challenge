import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../app-sidebar";
import Header from "../header";

function Layout(): React.JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full md:w-full h-full flex flex-col overflow-hidden'>
        <Header />
        <div className='flex-1 overflow-hidden'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default Layout;

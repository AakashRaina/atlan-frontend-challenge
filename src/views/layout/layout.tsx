import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Editor from "@/views/editor/";
import QueryResults from "@/views/query-results";
import AppSidebar from "../app-sidebar";

function Layout(): React.JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full md:w-full h-full flex flex-col overflow-hidden'>
        <div className='p-4.5 border-b flex items-center justify-between'>
          <div className='font-semibold text-lg'>
            <SidebarTrigger className='md:hidden' />
          </div>
        </div>
        <div className='flex-1 overflow-hidden'>
          <div className='p-3.5 h-full flex flex-col gap-2'>
            <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
              <Editor />
            </section>
            <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
              <QueryResults />
            </section>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default Layout;

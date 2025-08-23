import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Database,
  Sheet,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/data/schema";
import { db } from "@/data/database";
import { buildColumnsFromTable } from "@/lib/table-columns";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const customerColumns: ColumnDef<Customer>[] =
  buildColumnsFromTable("customers");

function Layout(): React.JSX.Element {
  return (
    <div className='h-screen flex md:flex-row flex-col'>
      <aside className='hidden md:block h-full'>
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <Select defaultValue='light'>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Theme' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>
                      <Database /> Light
                    </SelectItem>
                    <SelectItem value='dark'>
                      <Database /> Dark
                    </SelectItem>
                    <SelectItem value='system'>
                      <Database /> System
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type='text'
                  placeholder='Search schema'
                  className='my-4'
                />
                <ScrollArea className='h-72 w-full rounded-md'>
                  <div className='p-4'>
                    {tags.map((tag) => (
                      <React.Fragment key={tag}>
                        <div className='text-sm flex justify-start items-center'>
                          <Sheet size={16} className='pr-1' />
                          {tag}
                        </div>
                        <Separator className='my-2' />
                      </React.Fragment>
                    ))}
                  </div>
                </ScrollArea>
              </SidebarGroup>
              <Separator />
              <SidebarGroup>
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
              </SidebarGroup>
              <Separator />
              <SidebarGroup>
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
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
          </Sidebar>
        </SidebarProvider>
      </aside>
      <main className='w-full md:w-full h-full flex flex-col overflow-hidden'>
        <div className='p-4.5 border-b flex items-center justify-between'>
          <div className='font-semibold text-lg' />
        </div>
        <div className='flex-1 overflow-hidden'>
          <div className='p-3.5 h-full flex flex-col gap-4'>
            <section className='min-h-0 flex-[0_0_40%]'>
              <div className='h-full rounded-lg border p-4'>
                <div className='font-medium mb-2'>Section 1</div>
                <p className='text-sm text-muted-foreground'>1</p>
              </div>
            </section>
            <section className='min-h-0 flex-[0_0_60%]'>
              <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
                <div className='shrink-0 border-b pb-2 font-medium'>
                  Customers
                </div>
                <ScrollArea className='flex-1 min-h-0 rounded-md border mt-2'>
                  <div className='min-w-max p-2'>
                    <DataTable<Customer, unknown>
                      columns={customerColumns}
                      data={db.customers}
                    />
                  </div>
                </ScrollArea>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;

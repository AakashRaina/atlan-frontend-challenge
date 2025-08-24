import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet } from "lucide-react";
import React from "react";

function DataSource(): React.JSX.Element {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <>
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
      <Input type='text' placeholder='Search schema' className='my-4' />
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
    </>
  );
}

export default DataSource;

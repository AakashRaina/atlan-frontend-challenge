import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/data/schema";
import { db } from "@/data/database";
import { buildColumnsFromTable } from "@/lib/table-columns";

const customerColumns: ColumnDef<Customer>[] =
  buildColumnsFromTable("customers");

function QueryResults(): React.JSX.Element {
  return (
    <div className='h-full rounded-lg border p-4 flex flex-col min-h-0'>
      <div className='shrink-0 border-b pb-2 font-medium'>Customers</div>
      <ScrollArea className='flex-1 min-h-0 rounded-md border mt-2'>
        <div className='min-w-max p-2'>
          <DataTable<Customer, unknown>
            columns={customerColumns}
            data={db.customers}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

export default QueryResults;

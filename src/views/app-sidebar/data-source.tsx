import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { availableDatabases, getTablesByDatabase } from "@/data/database";
import { schema } from "@/data/schema";

function DataSource(): React.JSX.Element {
  const [selectedDatabase, setSelectedDatabase] = useState(
    availableDatabases[0].id
  );
  const [expandedTables, setExpandedTables] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const allTables = getTablesByDatabase(selectedDatabase);

  const tables = allTables.filter((tableName) =>
    tableName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTable = (tableName: string) => {
    if (expandedTables.includes(tableName)) {
      setExpandedTables(expandedTables.filter((name) => name !== tableName));
    } else {
      setExpandedTables([...expandedTables, tableName]);
    }
  };

  const handleDatabaseChange = (databaseId: string) => {
    setSelectedDatabase(databaseId);
    setExpandedTables([]);
    setSearchQuery("");
  };

  return (
    <>
      <Select value={selectedDatabase} onValueChange={handleDatabaseChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select Database' />
        </SelectTrigger>
        <SelectContent>
          {availableDatabases.map((db) => (
            <SelectItem key={db.id} value={db.id}>
              <div className='flex items-center gap-2 w-full'>
                <Database size={14} />
                <div className='flex flex-col items-start'>
                  <span className='text-sm'>{db.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className='my-4 space-y-2'>
        <Input
          type='text'
          placeholder='Search schema'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className='h-72 w-full rounded-md'>
        <div>
          {tables.length === 0 ? (
            <div className='text-sm text-muted-foreground text-center py-4'>
              {searchQuery
                ? `No tables found matching "${searchQuery}"`
                : "No tables available"}
            </div>
          ) : (
            tables.map((tableName) => {
              const tableSchema = schema[tableName];
              const isExpanded = expandedTables.includes(tableName);
              return (
                <div key={tableName} className='space-y-2'>
                  <div
                    className='text-sm flex justify-between items-center p-2 rounded bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors'
                    onClick={() => toggleTable(tableName)}
                  >
                    <div className='flex items-center gap-2'>
                      {isExpanded ? (
                        <ChevronDown
                          size={14}
                          className='text-muted-foreground'
                        />
                      ) : (
                        <ChevronRight
                          size={14}
                          className='text-muted-foreground'
                        />
                      )}
                      <Database size={14} className='text-muted-foreground' />
                      <span className='font-medium'>{tableName}</span>
                    </div>
                  </div>
                  {isExpanded && tableSchema && (
                    <div className='ml-2 text-xs font-mono space-y-1'>
                      {tableSchema.columns.map((column) => (
                        <div
                          key={column.name}
                          className='flex justify-between text-muted-foreground my-0.5'
                        >
                          <span>
                            {column.name}
                            {column.primaryKey && " (PK)"}
                            {column.references && " (FK)"}
                          </span>
                          <span>{column.type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </>
  );
}

export default DataSource;

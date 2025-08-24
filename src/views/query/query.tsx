import React, { useState } from "react";
import { useParams } from "react-router";
import Editor from "@/views/editor";
import QueryResults from "@/views/query-results";
import { executeQuery } from "@/lib/query-executor";

function Query(): React.JSX.Element {
  const { id } = useParams();
  const [query, setQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<
    | {
        data: any[];
        columns: string[];
        rowCount: number;
        executionTime: number;
      }
    | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQueryResults = async () => {
    setIsLoading(true);
    const results = await executeQuery(query);
    setQueryResults(results);
    setIsLoading(false);
  };

  const handleSave = () => {
    console.log("save", id, query);
  };

  const handleRun = () => {
    fetchQueryResults();
  };

  return (
    <div className='p-3.5 h-full flex flex-col gap-2'>
      <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
        <Editor
          id={id || ""}
          query={query}
          setQuery={setQuery}
          handleSave={handleSave}
          handleRun={handleRun}
          isLoading={isLoading}
        />
      </section>
      <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
        <QueryResults
          data={queryResults?.data}
          columns={queryResults?.columns}
          rowCount={queryResults?.rowCount}
          executionTime={queryResults?.executionTime}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}

export default Query;

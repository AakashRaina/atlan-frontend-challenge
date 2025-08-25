import React, { useState } from "react";
import { useParams } from "react-router";
import Editor from "@/views/editor";
import QueryResults from "@/views/query-results";
import { executeQuery } from "@/lib/query-executor";
import useAppStore from "@/store";

function Query(): React.JSX.Element {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const queryDetails = useAppStore((state) =>
    state.recentQueries.find((q) => q.id === id)
  );
  const updateQueryResults = useAppStore((state) => state.updateQueryResults);

  const queryString = queryDetails?.query ?? "";

  const fetchQueryResults = async () => {
    setIsLoading(true);
    const results = await executeQuery(queryString);
    updateQueryResults(id as string, results);
    setIsLoading(false);
  };

  const handleRun = () => {
    fetchQueryResults();
  };

  return (
    <div className='p-3.5 h-full flex flex-col gap-2'>
      <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
        <Editor handleRun={handleRun} isLoading={isLoading} />
      </section>
      <section className='min-h-0 h-[calc(50vh-0.25rem)] flex-none'>
        <QueryResults isLoading={isLoading} />
      </section>
    </div>
  );
}

export default Query;
